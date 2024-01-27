# frozen_string_literal: true

# Dummy class holding only damage, so that an ST can have multiple copies of a
# given QC or Battlegroup at a time
class CombatActor < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  belongs_to :actor, polymorphic: true

  has_many :poisons, as: :poisonable, dependent: :destroy

  validates :onslaught, numericality: { greater_than_or_equal_to: 0 }
  validates :damage_bashing,
            :damage_lethal,
            :damage_aggravated,
            :motes_personal_current,
            :motes_peripheral_current,
            :willpower_temporary,
            numericality: { greater_than_or_equal_to: 0 }
  validates :anima_level, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  def entity_type
    'combat_actor'
  end
  alias entity_assoc entity_type
  alias type entity_type

  def in_combat
    true
  end

  def not_a_stat
    false
  end
  alias hidden not_a_stat
  alias pinned not_a_stat
  alias_method :public, :not_a_stat # rubocop:disable Style/Alias
  alias sorting not_a_stat
  alias chronicle_sorting not_a_stat
end
