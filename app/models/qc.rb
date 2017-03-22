class Qc < ApplicationRecord
  include HealthLevels
  include Willpower

  belongs_to :player
  belongs_to :chronicle

  has_many :qc_merits

  # TODO create validator for actions

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }

  validates :motes_personal_current, numericality: { greater_than_or_equal_to: 0 }
  validates :motes_personal_total, numericality: { greater_than_or_equal_to: 0 }
  validates :motes_peripheral_current, numericality: { greater_than_or_equal_to: 0 }
  validates :motes_peripheral_total, numericality: { greater_than_or_equal_to: 0 }

  validate  :cant_have_more_current_motes_than_total

  validates :onslaught, numericality: { greater_than_or_equal_to: 0 }

  private

  def cant_have_more_current_motes_than_total
    if (motes_personal_current > motes_personal_total)
      errors.add(:motes_personal_current, "cannot be more than total")
    end
    if (motes_peripheral_current > motes_peripheral_total)
      errors.add(:motes_peripheral_current, "cannot be more than total")
    end
  end
end
