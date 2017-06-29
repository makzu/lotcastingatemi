# frozen_string_literal: true

# Traits for QCs.  A QC can serve as the base for any number of battlegroups.
class Qc < ApplicationRecord
  include HealthLevels
  include Willpower
  include Intimacies

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

  validates :motes_personal_current, :motes_personal_total,
            :motes_peripheral_current, :motes_peripheral_total,

            :grapple, :grapple_control,
            :hardness,
            :initiative, :onslaught,
            numericality: { greater_than_or_equal_to: 0 }

  validates :resolve, :guile, :appearance,
            :evasion, :parry, :soak,
            :movement,

            :senses,
            numericality: { greater_than: 0 }

  validates :actions, json: { schema: Schemas::QC_ACTION }
  validate :cant_have_more_current_motes_than_total

  private

  def cant_have_more_current_motes_than_total
    if motes_personal_current > motes_personal_total
      errors.add(:motes_personal_current, 'cannot be more than total')
    end
    if motes_peripheral_current > motes_peripheral_total # rubocop:disable Style/GuardClause
      errors.add(:motes_peripheral_current, 'cannot be more than total')
    end
  end
end
