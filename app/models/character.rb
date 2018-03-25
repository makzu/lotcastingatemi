# frozen_string_literal: true

# The central model for characters, holding stats that are common to all PCs.
# Traits specific to exalts will be in separate models, one per exalt type.
#
# Traits that Characters share in common with QCs, like health tracks, willpower
# pools, etc may eventually be split into separate classes, but Heroku has a
# limit on the total number of rows allowed in the database before they start
# charging extra.
class Character < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include HealthLevels
  include Willpower
  include Intimacies

  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy
  has_many :spells,  dependent: :destroy

  validates :name, presence: true

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }

  # TODO: see if values above 5 are valid for attributes and abilities
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

  before_validation :trim_armor_tags

  def trim_armor_tags
    return unless will_save_change_to_attribute? :armor_tags
    self.armor_tags = armor_tags.reject(&:blank?).collect(&:strip)
  end

  def entity_type
    'character'
  end

  def entity_assoc
    entity_type
  end

  def custom_exalt?
    false
  end
end
