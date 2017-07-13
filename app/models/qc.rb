# frozen_string_literal: true

# Traits for QCs.  A QC can serve as the base for any number of battlegroups.
class Qc < ApplicationRecord
  include HealthLevels
  include Willpower
  include Intimacies
  include MotePool

  has_many :battlegroups, dependent: :destroy
  has_many :qc_attacks,   dependent: :destroy
  has_many :qc_charms,    dependent: :destroy
  has_many :qc_merits,    dependent: :destroy

  belongs_to :player
  belongs_to :chronicle, optional: true

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }

  validates :grapple, :grapple_control,
            :hardness,
            :initiative, :onslaught,
            numericality: { greater_than_or_equal_to: 0 }

  validates :resolve, :guile, :appearance,
            :evasion, :parry, :soak,
            :movement,

            :senses,
            numericality: { greater_than: 0 }

  validates :actions, json: { schema: Schemas::QC_ACTION }
end
