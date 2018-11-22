# frozen_string_literal: true

# Traits and validations specific to Terrestrial Exalted
class DragonbloodCharacter < Character
  include AbilityExalt

  attribute :essence,                  :integer, default: 2
  attribute :motes_personal_total,     :integer, default: 13
  attribute :motes_personal_current,   :integer, default: 13
  attribute :motes_peripheral_total,   :integer, default: 31
  attribute :motes_peripheral_current, :integer, default: 31
  attribute :exalt_type,               :string,  default: 'Dragonblood'
  attribute :aura,                     :string,  default: 'none'

  DRAGONBLOOD_ASPECTS = %w[air earth fire water wood].freeze
  ASPECT_ABILITIES = {
    "air":   %w[ linguistics lore        occult        stealth    thrown    ],
    "earth": %w[ awareness   craft       integrity     resistance war       ],
    "fire":  %w[ athletics   dodge       melee         presence   socialize ],
    "water": %w[ brawl       bureaucracy investigation larceny    sail      ],
    "wood":  %w[ archery     medicine    performance   ride       survival  ]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_abilities

  validates :caste, inclusion: { in: DRAGONBLOOD_ASPECTS }, unless: :caste_is_blank?
  validates :aura, inclusion:  { in: DRAGONBLOOD_ASPECTS + ['none'] }
  validate  :favored_ability_count

  def self.from_character!(character)
    new_cha = character.becomes(DragonbloodCharacter)
    new_cha.type = 'DragonbloodCharacter'
    new_cha.caste_attributes = []
    new_cha.favored_attributes = []
    new_cha.supernal_ability = nil
    new_cha.caste = (new_cha.caste || '').downcase
    new_cha.caste = '' unless DRAGONBLOOD_ASPECTS.include? new_cha.caste
    new_cha.aura = 'none' unless (DRAGONBLOOD_ASPECTS + []).include? new_cha.aura

    new_cha.save!
    (new_cha.attribute_charms + new_cha.essence_charms).each do |charm|
      AbilityCharm.from_charm!(charm)
    end
    new_cha
  end

  private

  def set_mote_pool_totals
    return unless will_save_change_to_attribute?(:essence) || will_save_change_to_attribute?(:type)

    self.motes_personal_total     = essence + 11
    self.motes_peripheral_total   = (essence * 4) + 23
    if type_was == 'Character'
      self.motes_personal_current   = motes_personal_available
      self.motes_peripheral_current = motes_peripheral_available
    else
      self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end
  end

  def set_defaults
    self.exalt_type = 'Dragon-Blood'
    self.aspect = true
    self.excellency = 'dragonblood'
    self.excellency_stunt = ''
    self.excellencies_for = ['dragonblood']
    self.limit = nil
  end

  def set_caste_abilities
    return unless will_save_change_to_attribute?(:caste) || will_save_change_to_attribute?(:type)

    self.caste_abilities = ASPECT_ABILITIES[caste.to_sym] || []
    self.favored_abilities = favored_abilities - (ASPECT_ABILITIES[caste.to_sym] || [])
  end

  def favored_ability_count
    errors.add(:favored_abilities, 'Must have at most 5 favored abilities') unless favored_abilities.length <= 5
  end
end
