# frozen_string_literal: true

# Holds traits specific to Battlegroups, as defined starting at Core p.205.
class Battlegroup < ApplicationRecord
  include Willpower

  belongs_to :player
  belongs_to :chronicle, optional: true

  has_many :qc_attacks, as: :qc_attackable, dependent: :destroy

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
end
