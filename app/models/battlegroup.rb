# frozen_string_literal: true

# Holds traits specific to Battlegroups, as defined starting at Core p.205.
# DEPRECATED ATTRIBUTES:
# sort_order, in favor of sorting via ranked_model
# chronicle_sort_order, in favor of chronicle_sorting via ranked_model
class Battlegroup < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include RankedModel
  include Willpower

  ranks :sorting, with_same: :player_id
  ranks :chronicle_sorting, with_same: :chronicle_id

  with_options dependent: :destroy do
    has_many :qc_attacks,    as: :qc_attackable, inverse_of: :qc_attackable
    has_many :poisons,       as: :poisonable,    inverse_of: :poisonable
    has_many :combat_actors, as: :actor,         inverse_of: :actor
  end

  validates :size, zero_thru_five_stat: true

  validates :might, inclusion: { in: 0..3, message: 'might must be between 0 and 3' }
  validates :drill, inclusion: { in: 0..2, message: 'drill must be between 0 (poor) and 2 (elite)' }

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, one_thru_ten_stat: true

  validates :resolve, :guile, :appearance,
            :join_battle, :evasion, :parry, :soak,
            :movement, :senses,
            :hardness, :onslaught,
            numericality: { greater_than_or_equal_to: 0 }

  def entity_type
    'battlegroup'
  end
  alias entity_assoc entity_type
  alias type entity_type

  # Creates a battlegroup with the stats of a particular QC and all of its
  # attacks.
  # Does not save the record to the database.
  def self.new_from_qc(qc)
    qc_copy = qc.deep_clone include: :qc_attacks

    battlegroup = Battlegroup.new qc_copy.slice %i[
      name description essence willpower_temporary willpower_permanent soak
      hardness evasion parry movement resolve guile appearance join_battle
      armor_name senses portrait_link
    ]
    battlegroup.health_levels = qc_copy.total_health_levels
    battlegroup.magnitude = battlegroup.health_levels + 1
    battlegroup.qc_attacks = qc_copy.qc_attacks
    battlegroup.name = "#{battlegroup.name} (Battlegroup)"
    battlegroup
  end
end
