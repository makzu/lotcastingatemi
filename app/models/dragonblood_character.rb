# frozen_string_literal: true

# Traits and validations specific to Terrestrial Exalted
# TODO: replace mote counts as needed to reflect numbers in the hardback once
#      that chapter is released
class DragonbloodCharacter < Character
  include AbilityExalt

  attribute :essence,                  :integer, default: 2
  attribute :motes_personal_total,     :integer, default: 13
  attribute :motes_personal_current,   :integer, default: 13
  attribute :motes_peripheral_total,   :integer, default: 31
  attribute :motes_peripheral_current, :integer, default: 31
  attribute :exalt_type,               :string,  default: 'Dragonblood'

  has_many :dragonblood_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :dragonblood_charms

  DRAGONBLOOD_ASPECTS = %w[air earth fire water wood].freeze
  ASPECT_ABILITIES = {
    "air":   %w[ linguistics lore occult stealth thrown ],
    "earth": %w[ awareness craft integrity resistance war ],
    "fire":  %w[ athletics dodge melee presence socialize ],
    "water": %w[ brawl bureaucracy investigation larceny sail ],
    "wood":  %w[ archery medicine performance ride survival ]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_abilities

  validates :caste, inclusion: { in: DRAGONBLOOD_ASPECTS }, unless: :caste_is_blank?
  validates :aura, inclusion:  { in: DRAGONBLOOD_ASPECTS + [''] }
  validate  :favored_ability_count

  private

  def set_mote_pool_totals
    return unless will_save_change_to_attribute? :essence

    self.motes_personal_total     = essence + 11
    self.motes_peripheral_total   = (essence * 4) + 23
    self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
    self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
  end

  def set_defaults
    self.exalt_type = 'Dragon-Blood'
    self.aspect = true
    self.excellency = ''
    self.excellency_stunt = ''
    self.excellencies_for = []
  end

  def set_caste_abilities
    return unless will_save_change_to_attribute? :caste
    self.caste_abilities = ASPECT_ABILITIES[caste.to_sym]
    self.favored_abilities = favored_abilities - ASPECT_ABILITIES[caste.to_sym]
  end

  def favored_ability_count
    errors.add(:favored_abilities, 'Must have at most 5 favored abilities') unless favored_abilities.length <= 5
  end
end
