ACTION_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["action", "pool"],
    "properties": {
      "action": { "type": "string" },
      "pool": { "type": "integer", "minimum": 0, "maximum": 99 }
    },
    "additionalProperties": false
  }
}

class Qc < ApplicationRecord
  include HealthLevels
  include Willpower
  include Intimacies

  has_many :battlegroups
  has_many :qc_attacks, dependent: :destroy
  has_many :qc_merits, dependent: :destroy

  belongs_to :player
  belongs_to :chronicle, optional: true

  # TODO create validator for actions

  # Essence above 5 is explicitly mentioned in the book
  validates_numericality_of :essence, greater_than_or_equal_to: 1, less_than_or_equal_to: 10

  validates_numericality_of :motes_personal_current, :motes_personal_total,
      :motes_peripheral_current, :motes_peripheral_total,

      :grapple, :grapple_control,
      :hardness,
      :initiative, :onslaught,
    greater_than_or_equal_to: 0

  validates_numericality_of :resolve, :guile, :appearance,
      :evasion, :parry, :soak,
      :movement,

      :senses,
    greater_than: 0

  validates :actions, json: { schema: ACTION_SCHEMA }
  validate :cant_have_more_current_motes_than_total

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
