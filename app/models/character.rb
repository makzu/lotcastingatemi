# frozen_string_literal: true

# The central model for characters, holding stats that are common to all PCs.
# Traits specific to exalts will be in separate models, one per exalt type.
# DEPRECATED ATTRIBUTES:
# shaping_rituals, in favor of rituals
# xp_spent, in favor of xp_log
# xp_solar_spent, in favor of xp_log_solar
class Character < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include HealthLevels
  include Intimacies
  include Sortable
  include SortableBySt
  include Willpower

  has_many :merits,  dependent: :destroy
  has_many :weapons, dependent: :destroy
  has_many :spells,  dependent: :destroy, as: :sorcerer

  has_many :ability_charms,      inverse_of: :character, dependent: :destroy, class_name: '::Charms::AbilityCharm'
  has_many :attribute_charms,    inverse_of: :character, dependent: :destroy, class_name: '::Charms::AttributeCharm'
  has_many :essence_charms,      inverse_of: :character, dependent: :destroy, class_name: '::Charms::EssenceCharm'
  has_many :martial_arts_charms, inverse_of: :character, dependent: :destroy, class_name: '::Charms::MartialArtsCharm'
  has_many :spirit_charms,       inverse_of: :character, dependent: :destroy, class_name: '::Charms::SpiritCharm'
  has_many :evocations,          inverse_of: :character, dependent: :destroy, class_name: '::Charms::Evocation'

  has_many :poisons, as: :poisonable, dependent: :destroy

  normalizes :armor_tags, with: method(:trim_array_attribute)

  validates :name, presence: true

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, one_thru_ten_stat: true

  # Attributes can normally be one through five
  # Increasing Strength Exercise and other Charms can increase this further
  validates :attr_strength,     :attr_dexterity,    :attr_stamina,
            :attr_charisma,     :attr_manipulation, :attr_appearance,
            :attr_intelligence, :attr_perception,   :attr_wits,
            one_thru_ten_stat: true

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
  validates :xp_log,            json: { schema: Schemas::XP_LOG       }
  validates :xp_log_solar,      json: { schema: Schemas::XP_LOG       }
  validates :bp_log,            json: { schema: Schemas::XP_LOG       }
  validates :forms,             json: { schema: Schemas::FORM         }

  validates :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
            numericality: { greater_than_or_equal_to: 0 }

  validates :armor_weight, inclusion: { in: %w[ unarmored light medium heavy ] }

  validates :sorcerous_motes, numericality: { greater_than_or_equal_to: 0 }
  validates :onslaught,       numericality: { greater_than_or_equal_to: 0 }

  after_initialize :set_xp_log
  after_initialize :set_solar_xp_log
  after_initialize :set_rituals

  def set_xp_log
    return if xp_spent.zero? || !xp_log.empty?

    self.xp_log = [{ label: 'Spent XP', points: xp_spent }]
  end

  def set_solar_xp_log
    return if xp_solar_spent.zero? || !xp_log_solar.empty?

    self.xp_log_solar = [{ label: 'Spent Solar XP', points: xp_solar_spent }]
  end

  def set_rituals
    return if shaping_rituals.blank? || !rituals.empty?

    self.rituals = [shaping_rituals]
  end

  def entity_type
    'character'
  end
  alias entity_assoc entity_type

  def custom_exalt?
    false
  end

  def self.character_types
    %w[
      Character SolarCharacter DragonbloodCharacter LunarCharacter SiderealCharacter AbyssalCharacter
      CustomAbilityCharacter CustomAttributeCharacter CustomEssenceCharacter
    ]
  end

  def self.association_types
    %i[
      ability_charms attribute_charms essence_charms martial_arts_charms
      evocations spirit_charms weapons merits spells
    ]
  end

  def self.from_character!(character)
    new_cha = character.becomes(Character)
    new_cha.type = 'Character'
    new_cha.caste_attributes = new_cha.favored_attributes = new_cha.caste_abilities = new_cha.favored_abilities = new_cha.motes_committed = new_cha.anima_powers = new_cha.excellencies_for = []
    new_cha.supernal_ability = new_cha.limit = new_cha.limit_trigger = nil
    new_cha.caste = new_cha.aura = new_cha.anima_display = new_cha.excellency = new_cha.excellency_stunt = ''
    new_cha.motes_personal_current = new_cha.motes_personal_total = new_cha.motes_peripheral_current = new_cha.motes_peripheral_total = new_cha.anima_level = 0
    new_cha.aspect = false
    new_cha.exalt_type = 'Mortal'
    new_cha.save!
    (
      new_cha.attribute_charms + new_cha.ability_charms + new_cha.essence_charms +
      new_cha.spirit_charms + new_cha.evocations + new_cha.martial_arts_charms
    ).each(&:destroy)
    new_cha
  end

  def charms
    []
  end
end
