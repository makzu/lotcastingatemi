# frozen_string_literal: true

# Traits and Validations specific to sidereals.
class SiderealCharacter < Character
  include AbilityExalt

  attribute :motes_personal_total,     :integer, default: 11
  attribute :motes_personal_current,   :integer, default: 11
  attribute :motes_peripheral_total,   :integer, default: 31
  attribute :motes_peripheral_current, :integer, default: 31
  attribute :exalt_type,               :string,  default: 'Sidereal'

  SIDEREAL_CASTES = %w[ journeys serenity battles secrets endings ].freeze
  CASTE_ABILITIES = {
    "journeys": %w[ resistance ride sail survival thrown ],
    "serenity": %w[ craft dodge linguistics performance socialize ],
    "battles":  %w[ archery brawl melee presence war ],
    "secrets":  %w[ investigation larceny lore occult stealth ],
    "endings":  %w[ athletics awareness bureaucracy integrity medicine ]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_abilities_on_caste_change

  validates :caste, inclusion: { in: SIDEREAL_CASTES }, unless: :caste_is_blank?
  validate :caste_abilities_are_valid,                  unless: :caste_is_blank?

  validate :five_caste_and_five_favored_abilities

  validates :limit, numericality: {
    greater_than_or_equal_to: 0, less_than_or_equal_to: 10
  }

  def self.from_character!(character)
    new_cha = character.becomes(SiderealCharacter)
    new_cha.type = 'SiderealCharacter'
    new_cha.caste_attributes = []
    new_cha.favored_attributes = []
    new_cha.supernal_ability = nil
    new_cha.caste = (new_cha.caste || '').downcase
    new_cha.caste = '' unless SIDEREAL_CASTES.include? new_cha.caste
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
    unless will_save_change_to_attribute?(:essence) || will_save_change_to_attribute?(:type)
      return
    end

    self.motes_personal_total     = (essence * 2) + 9
    self.motes_peripheral_total   = (essence * 6) + 25
    if type_was == 'Character'
      self.motes_personal_current   = motes_personal_available
      self.motes_peripheral_current = motes_peripheral_available
    else
      self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end
  end

  def set_defaults
    self.exalt_type = 'Sidereal'
    self.aspect = false
    self.aura = ''
    self.excellency = 'sidereal'
    self.excellency_stunt = ''
    self.excellencies_for = ['sidereal']
  end

  def set_caste_abilities_on_caste_change
    return unless will_save_change_to_attribute? :caste

    self.caste_abilities = caste_abilities.select { |a| allowed_caste_abilities.include? a }
  end

  def caste_abilities_are_valid
    caste_abilities.each do |a|
      unless (CASTE_ABILITIES[caste.to_sym] || []).include? a
        errors.add(:caste_abilities, "#{a} is not a valid caste ability for #{caste}s")
      end
    end
  end

  def five_caste_and_five_favored_abilities
    unless caste_abilities.length <= 5
      errors.add(:caste_abilities, 'Must have at most 5 caste abilities')
    end
    unless favored_abilities.length <= 5 # rubocop:disable Style/GuardClause
      errors.add(:favored_abilities, 'Must have at most 5 favored abilities')
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
