# frozen_string_literal: true

class Character < ApplicationRecord
  include HealthLevels
  include Willpower
  include Intimacies

  belongs_to :player
  # TODO: validate that if a character is in a chronicle, the player must be in it too
  belongs_to :chronicle, optional: true

  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy

  validates :name, presence: true

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }

  # TODO: see if values above 5 are/will ever be valid for attributes and abilities

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

  validates :abil_craft,        json: { schema: Schemas::CRAFT        }
  validates :abil_martial_arts, json: { schema: Schemas::MARTIAL_ARTS }

  validates :specialties,       json: { schema: Schemas::SPECIALTY    }

  validates :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
            numericality: { greater_than_or_equal_to: 0 }

  validates :armor_weight, inclusion: { in: %w[ unarmored light medium heavy ] }

  validates :sorcerous_motes, numericality: { greater_than_or_equal_to: 0 }
  validates :onslaught,       numericality: { greater_than_or_equal_to: 0 }
end
