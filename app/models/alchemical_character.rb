# frozen_string_literal: true

# Traits and validations specific to Alchemical Exalted
class AlchemicalCharacter < Character
  include AttributeExalt

  attribute :motes_personal_total,     :integer, default: 16
  attribute :motes_personal_current,   :integer, default: 16
  attribute :motes_peripheral_total,   :integer, default: 38
  attribute :motes_peripheral_current, :integer, default: 38
  attribute :exalt_type,               :string,  default: 'Alchemical'

  ALCHEMICAL_CASTES = %w[orichalcum jade moonsilver starmetal soulsteel adamant].freeze
  CASTE_ATTRIBUTES = {
    orichalcum: %w[strength charisma intelligence],
    moonsilver: %w[dexterity appearance wits],
    jade:       %w[stamina charisma wits],
    starmetal:  %w[dexterity manipulation intelligence],
    soulsteel:  %w[stamina manipulation perception],
    adamant:    %w[strength appearance perception]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_attributes_on_caste_change

  validates :caste, inclusion: { in: ALCHEMICAL_CASTES }, unless: :caste_is_blank?
  validate  :caste_attributes_are_valid, unless: :caste_is_blank?
  validates :caste_attributes, :favored_attributes, length: { maximum: 2 }

  def self.from_character!(character)
    new_cha = character.becomes(AlchemicalCharacter)
    new_cha.type = 'AlchemicalCharacter'
    new_cha.caste_abilities = new_cha.favored_abilities = []
    new_cha.caste = (new_cha.caste || '').downcase
    new_cha.caste = '' unless ALCHEMICAL_CASTES.include? new_cha.caste
    new_cha.caste_attributes = new_cha.caste_attributes & (CASTE_ATTRIBUTES[new_cha.caste.to_sym] || [])
    new_cha.limit = 0 if new_cha.limit.blank?

    new_cha.save!
    (new_cha.ability_charms + new_cha.essence_charms).each do |charm|
      AttributeCharm.from_charm!(charm)
    end
    new_cha
  end

  private

  def set_mote_pool_totals
    return unless will_save_change_to_attribute?(:essence) || will_save_change_to_attribute?(:type)

    self.motes_personal_total = essence + 15
    self.motes_peripheral_total = (essence * 4) + 34
    if type_was == 'Character'
      self.motes_personal_current   = motes_personal_available
      self.motes_peripheral_current = motes_peripheral_available
    else
      self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end
  end

  def set_caste_attributes_on_caste_change
    return unless will_save_change_to_attribute? :caste

    self.caste_attributes = caste_attributes.select { |a| allowed_caste_attributes.include? a }
  end

  def set_defaults
    self.exalt_type = 'Alchemical'
    self.aspect = false
    self.aura = ''
    self.excellency = ''
    self.excellency_stunt = ''
    self.excellencies_for = []
    self.caste_abilities = []
    self.favored_abilities = []
  end

  def caste_attributes_are_valid
    caste_attributes.each do |a|
      unless (CASTE_ATTRIBUTES[caste.to_sym] || []).include? a
        errors.add(:caste_attributes,
                   "#{a} is not a valid caste attribute for #{caste}s")
      end
    end
  end

  def allowed_caste_attributes
    caste.blank? ? [] : CASTE_ATTRIBUTES[caste.to_sym]
  end
end
