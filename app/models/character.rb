CRAFT_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["craft", "rating"],
    "properties": {
      "craft": { "type": "string" },
      "rating": { "type": "integer", "minimum": 0, "maximum": 5 }
    },
    "additionalProperties": false
  }
}

MARTIAL_ARTS_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["style", "rating"],
    "properties": {
      "style": { "type": "string" },
      "rating": { "type": "integer", "minimum": 0, "maximum": 5 }
    },
    "additionalProperties": false
  }
}

SPECIALTY_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["ability", "context"],
    "properties": {
      "ability": {
        "type": "string",
        "enum": [
          "archery", "athletics", "awareness", "brawl", "bureaucracy", "craft",
          "dodge", "integrity", "investigation", "larceny", "linguistics",
          "lore", "martial arts", "medicine", "melee", "occult", "performance",
          "presence", "resistance", "ride", "sail", "socialize", "stealth",
          "survival", "thrown", "war"
        ]
      },
      "context": { "type": "string" }
    },
    "additionalProperties": false
  }
}

class Character < ApplicationRecord
  include HealthLevels
  include Willpower
  include Intimacies

  belongs_to :player
  belongs_to :chronicle, optional: true

  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy


  validates :name, presence: true

  # Essence above 5 is explicitly mentioned in the book
  validates_numericality_of :essence, greater_than_or_equal_to: 1, less_than_or_equal_to: 10

  # TODO see if values above 5 are/will ever be valid for attributes and abilities

  # Attributes can be one through five
  validates :attr_strength,     :attr_dexterity,    :attr_stamina,
            :attr_charisma,     :attr_manipulation, :attr_appearance,
            :attr_intelligence, :attr_perception,   :attr_wits,
      one_thru_five_stat: true

  # Abilities can be zero through five
  validates :abil_archery,     :abil_athletics,      :abil_awareness,
            :abil_brawl,       :abil_bureaucracy,    :abil_dodge,
            :abil_integrity,   :abil_investigation,  :abil_larceny,
            :abil_linguistics, :abil_lore,           :abil_medicine,
            :abil_melee,       :abil_occult,         :abil_performance,
            :abil_presence,    :abil_resistance,     :abil_ride,
            :abil_sail,        :abil_socialize,      :abil_stealth,
            :abil_survival,    :abil_thrown,         :abil_war,
    zero_thru_five_stat: true

  validates :abil_craft,        json: { schema: CRAFT_SCHEMA        }
  validates :abil_martial_arts, json: { schema: MARTIAL_ARTS_SCHEMA }

  validates :specialties,       json: { schema: SPECIALTY_SCHEMA    }

  validates_numericality_of :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
    greater_than_or_equal_to: 0

  validates :armor_weight, inclusion: { in: %w{unarmored light medium heavy}  }

  validates_numericality_of :sorcerous_motes, greater_than_or_equal_to: 0
  validates_numericality_of :onslaught,       greater_than_or_equal_to: 0
end
