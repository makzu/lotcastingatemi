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

INTIMACY_SCHEMA = {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["subject", "rating"],
    "properties": {
      "subject": { "type": "string" },
      "rating": { "type": "integer", "minimum": 0, "maximum": 3 }
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

  belongs_to :player
  belongs_to :chronicle

  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy

  validates :name, presence: true

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }

  # TODO see if values above 5 are/will ever be valid for attributes and abilities

  # Attributes can be one through five
  validates :attr_strength,       one_thru_five_stat: true
  validates :attr_dexterity,      one_thru_five_stat: true
  validates :attr_stamina,        one_thru_five_stat: true
  validates :attr_charisma,       one_thru_five_stat: true
  validates :attr_manipulation,   one_thru_five_stat: true
  validates :attr_appearance,     one_thru_five_stat: true
  validates :attr_intelligence,   one_thru_five_stat: true
  validates :attr_perception,     one_thru_five_stat: true
  validates :attr_wits,           one_thru_five_stat: true

  # Abilities can be zero through five
  validates :abil_archery,        zero_thru_five_stat: true
  validates :abil_athletics,      zero_thru_five_stat: true
  validates :abil_awareness,      zero_thru_five_stat: true
  validates :abil_brawl,          zero_thru_five_stat: true
  validates :abil_bureaucracy,    zero_thru_five_stat: true
  validates :abil_dodge,          zero_thru_five_stat: true
  validates :abil_integrity,      zero_thru_five_stat: true
  validates :abil_investigation,  zero_thru_five_stat: true
  validates :abil_larceny,        zero_thru_five_stat: true
  validates :abil_linguistics,    zero_thru_five_stat: true
  validates :abil_lore,           zero_thru_five_stat: true
  validates :abil_medicine,       zero_thru_five_stat: true
  validates :abil_melee,          zero_thru_five_stat: true
  validates :abil_occult,         zero_thru_five_stat: true
  validates :abil_performance,    zero_thru_five_stat: true
  validates :abil_presence,       zero_thru_five_stat: true
  validates :abil_resistance,     zero_thru_five_stat: true
  validates :abil_ride,           zero_thru_five_stat: true
  validates :abil_sail,           zero_thru_five_stat: true
  validates :abil_socialize,      zero_thru_five_stat: true
  validates :abil_stealth,        zero_thru_five_stat: true
  validates :abil_survival,       zero_thru_five_stat: true
  validates :abil_thrown,         zero_thru_five_stat: true
  validates :abil_war,            zero_thru_five_stat: true

  validates :abil_craft,          json: { schema: CRAFT_SCHEMA        }
  validates :abil_martial_arts,   json: { schema: MARTIAL_ARTS_SCHEMA }

  validates :principles,          json: { schema: INTIMACY_SCHEMA     }
  validates :ties,                json: { schema: INTIMACY_SCHEMA     }

  validates :specialties,         json: { schema: SPECIALTY_SCHEMA    }

  validates :xp_craft_silver,     numericality: { greater_than_or_equal_to: 0 }
  validates :xp_craft_gold,       numericality: { greater_than_or_equal_to: 0 }
  validates :xp_craft_white,      numericality: { greater_than_or_equal_to: 0 }

  validates :armor_weight, inclusion: { in: %w{unarmored light medium heavy}  }

  validates :sorcerous_motes,     numericality: { greater_than_or_equal_to: 0 }

  validates :onslaught,           numericality: { greater_than_or_equal_to: 0 }
end
