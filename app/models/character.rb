# frozen_string_literal: true

# The central model for characters, holding stats that are common to all PCs.
# Traits specific to exalts will be in separate models, one per exalt type.
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
  has_many :spells,  dependent: :destroy

  has_many :ability_charms,      foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::AbilityCharm'
  has_many :attribute_charms,    foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::AttributeCharm'
  has_many :essence_charms,      foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::EssenceCharm'
  has_many :martial_arts_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::MartialArtsCharm'
  has_many :spirit_charms,       foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::SpiritCharm'
  has_many :evocations,          foreign_key: 'character_id', inverse_of: :character, dependent: :destroy, class_name: '::Charms::Evocation'

  has_many :poisons, as: :poisonable, dependent: :destroy

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
            numericality: {
              greater_than_or_equal_to: 1, less_than_or_equal_to: 10
            }

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

  validates :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
            numericality: { greater_than_or_equal_to: 0 }

  validates :armor_weight, inclusion: { in: %w[ unarmored light medium heavy ] }

  validates :sorcerous_motes, numericality: { greater_than_or_equal_to: 0 }
  validates :onslaught,       numericality: { greater_than_or_equal_to: 0 }

  before_validation :trim_armor_tags
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

  def trim_armor_tags
    return unless will_save_change_to_attribute? :armor_tags

    self.armor_tags = armor_tags.reject(&:blank?).collect(&:strip).collect(&:downcase).uniq
  end

  def entity_type
    'character'
  end
  alias_attribute :entity_assoc, :entity_type

  def custom_exalt?
    false
  end

  def self.association_types
    %i[
      ability_charms attribute_charms essence_charms martial_arts_charms
      evocations spirit_charms weapons merits spells poisons
    ]
  end
end
