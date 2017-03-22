class Character < ApplicationRecord
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

  # TODO check to ensure valid ranges for Willpower
  validates :willpower_temporary,
    numericality: { less_than_or_equal_to: 10, greater_than_or_equal_to: 0 }
  validates :willpower_permanent,
    numericality: { less_than_or_equal_to: 10, greater_than: 0             }

  # TODO check if it's possible for a character to have less than the 7
  #      standard health levels
  validates :health_level_0s,     numericality: { greater_than: 0 }
  validates :health_level_1s,     numericality: { greater_than: 0 }
  validates :health_level_2s,     numericality: { greater_than: 0 }
  validates :health_level_4s,     numericality: { greater_than: 0 }
  validates :health_level_incap,  numericality: { greater_than: 0 }

  validates :damage_bashing,      numericality: { greater_than_or_equal_to: 0 }
  validates :damage_lethal,       numericality: { greater_than_or_equal_to: 0 }
  validates :damage_aggravated,   numericality: { greater_than_or_equal_to: 0 }

  validates :xp_craft_silver,     numericality: { greater_than_or_equal_to: 0 }
  validates :xp_craft_gold,       numericality: { greater_than_or_equal_to: 0 }
  validates :xp_craft_white,      numericality: { greater_than_or_equal_to: 0 }

  validates :armor_weight, inclusion: { in: %w{unarmored light medium heavy} }

  validates :sorcerous_motes,     numericality: { greater_than_or_equal_to: 0 }
end
