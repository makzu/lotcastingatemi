# frozen_string_literal: true

# Traits and Validations specific to Solars.
class SolarCharacter < Character
  include AbilityExalt

  attribute :motes_personal_total,     :integer, default: 13
  attribute :motes_personal_current,   :integer, default: 13
  attribute :motes_peripheral_total,   :integer, default: 33
  attribute :motes_peripheral_current, :integer, default: 33
  attribute :exalt_type,               :string,  default: 'Solar'

  CASTES = %w[ dawn zenith twilight night eclipse ].freeze
  CASTE_ABILITIES = {
    dawn:     %w[ archery awareness brawl dodge melee resistance thrown war ],
    zenith:   %w[ athletics integrity performance lore presence resistance survival war ],
    twilight: %w[ bureaucracy craft integrity investigation linguistics lore medicine occult ],
    night:    %w[ athletics awareness dodge investigation larceny ride stealth socialize ],
    eclipse:  %w[ bureaucracy larceny linguistics occult presence ride sail socialize ]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_abilities_on_supernal_change
  before_validation :set_caste_abilities_on_caste_change

  validates :caste, inclusion: { in: CASTES }, unless: :caste_is_blank?
  validate :caste_abilities_are_valid,         unless: :caste_is_blank?
  validate :supernal_ability_is_caste,         unless: :caste_is_blank?

  validates :caste_abilities, :favored_abilities, length: { maximum: 5 }

  validates :limit, numericality: {
    greater_than_or_equal_to: 0, less_than_or_equal_to: 10
  }

  def self.from_character!(character)
    new_cha = character.becomes(SolarCharacter)
    new_cha.type = 'SolarCharacter'
    new_cha.caste_attributes = []
    new_cha.favored_attributes = []
    new_cha.caste = (new_cha.caste || '').downcase
    new_cha.caste = '' unless CASTES.include? new_cha.caste
    new_cha.caste_abilities = new_cha.caste_abilities & (CASTE_ABILITIES[new_cha.caste.to_sym] || [])
    new_cha.limit = 0 if new_cha.limit.blank?

    new_cha.save!
    (new_cha.attribute_charms + new_cha.essence_charms).each do |charm|
      AbilityCharm.from_charm!(charm)
    end
    new_cha
  end

  private

  def set_mote_pool_totals
    return unless will_save_change_to_attribute?(:essence) || will_save_change_to_attribute?(:type)

    self.motes_personal_total     = (essence * 3) + 10
    self.motes_peripheral_total   = (essence * 7) + 26
    if type_was == 'Character'
      self.motes_personal_current   = motes_personal_available
      self.motes_peripheral_current = motes_peripheral_available
    else
      self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end
  end

  def set_defaults
    self.exalt_type = 'Solar'
    self.aspect = false
    self.aura = ''
    self.excellency = 'solar'
    self.excellency_stunt = ''
    self.excellencies_for = ['solar']
    remove_caste_and_favored_attributes
  end

  def set_caste_abilities_on_supernal_change
    return unless will_save_change_to_attribute?(:supernal_ability) &&
                  supernal_ability.present? &&
                  caste_abilities.exclude?(supernal_or_brawl)

    add_supernal_to_caste
    self.favored_abilities = favored_abilities - caste_abilities
  end

  def set_caste_abilities_on_caste_change
    return unless will_save_change_to_attribute? :caste

    self.supernal_ability = nil unless allowed_caste_abilities.include? supernal_ability
    self.caste_abilities = caste_abilities.select { |a| allowed_caste_abilities.include? a }
  end

  def caste_abilities_are_valid
    caste_abilities.each do |a|
      unless (CASTE_ABILITIES[caste.to_sym] || []).include? a
        errors.add(:caste_abilities,
                   "#{a} is not a valid caste ability for #{caste}s")
      end
    end
  end

  def supernal_ability_is_caste
    return if supernal_ability.blank? || caste_abilities.include?(supernal_ability)

    if supernal_ability == 'martial_arts'
      unless caste_abilities.include?('brawl')
        errors.add(:supernal_ability,
                   'Brawl must be a caste ability for supernal martial artists')
      end
    else
      errors.add(:supernal_ability, 'Must be a caste ability')
    end
  end

  def allowed_caste_abilities
    caste.blank? ? [] : CASTE_ABILITIES[caste.to_sym]
  end

  def add_supernal_to_caste
    if caste_abilities.length < 5
      self.caste_abilities += [supernal_or_brawl]
    else
      self.caste_abilities[4] = supernal_or_brawl
    end
  end

  def supernal_or_brawl
    supernal_ability == 'martial_arts' ? 'brawl' : supernal_ability
  end
end
