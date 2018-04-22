# frozen_string_literal: true

# Holds traits specific to Battlegroups, as defined starting at Core p.205.
class Battlegroup < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include Sortable
  include SortableBySt
  include Willpower

  has_many :qc_attacks, dependent: :destroy, as: :qc_attackable
  has_many :combat_actors, dependent: :destroy, as: :actor

  validates :size, zero_thru_five_stat: true

  validates :might, inclusion: { in: 0..3, message: 'might must be between 0 and 3' }
  validates :drill, inclusion: { in: 0..2, message: 'drill must be between 0 (poor) and 2 (elite)' }

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }

  validates :hardness,
            :onslaught,
            numericality: { greater_than_or_equal_to: 0 }

  validates :resolve, :guile, :appearance,
            :join_battle, :evasion, :parry, :soak,
            :movement, :senses,
            numericality: { greater_than: 0 }

  def entity_type
    'battlegroup'
  end

  def type
    entity_type
  end

  def entity_assoc
    entity_type
  end
end
