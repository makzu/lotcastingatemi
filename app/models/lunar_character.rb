# frozen_string_literal: true

# Traits and validations specific to Lunar Exalted
class LunarCharacter < Character
  include AttributeExalt

  attribute :motes_personal_total,     :integer, default: 16
  attribute :motes_personal_current,   :integer, default: 16
  attribute :motes_peripheral_total,   :integer, default: 38
  attribute :motes_peripheral_current, :integer, default: 38
  attribute :exalt_type,               :string,  default: 'Lunar'

  LUNAR_CASTES = ['full moon', 'changing moon', 'no moon', 'casteless'].freeze
  CASTE_ATTRIBUTES = {
    'full moon':     %w[strength dexterity stamina],
    'changing moon': %w[charisma manipulation appearance],
    'no moon':       %w[intelligence perception wits],
    'casteless':     %w[]
  }.freeze

  before_validation :set_mote_pool_totals
  before_validation :set_defaults
  before_validation :set_caste_attributes_on_caste_change

  validates :caste, inclusion: { in: LUNAR_CASTES }, unless: :caste_is_blank?
  validate  :caste_attributes_are_valid,             unless: :caste_is_blank?
  validate  :two_caste_and_two_favored_attributes

  def self.from_character!(character)
    new_cha = character.becomes(LunarCharacter)
    new_cha.type = 'LunarCharacter'
    new_cha.caste_abilities = new_cha.favored_abilities = []
    new_cha.caste = (new_cha.caste || '').downcase
    new_cha.caste = '' unless LUNAR_CASTES.include? new_cha.caste
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
    self.exalt_type = 'Lunar'
    self.aspect = false
    self.aura = ''
    self.excellency = 'lunar'
    self.excellency_stunt = 'lunar'
    self.excellencies_for = ['lunar']
    self.caste_abilities = []
    self.favored_abilities = []
  end

  # rubocop:disable Style/IfUnlessModifier
  def caste_attributes_are_valid
    caste_attributes.each do |a|
      unless (CASTE_ATTRIBUTES[caste.to_sym] || []).include? a
        errors.add(:caste_attributes, "#{a} is not a valid caste attribute for #{caste}s")
      end
    end
  end
  # rubocop:enable Style/IfUnlessModifier

  def two_caste_and_two_favored_attributes
    errors.add(:caste_attributes, 'Lunars can only have up to 2 caste attributes') if caste_attributes.count > 2
    errors.add(:favored_attributes, 'Lunars can only have up to 2 favored attributes') if favored_attributes.count > 2
  end

  def allowed_caste_attributes
    caste.blank? ? [] : CASTE_ATTRIBUTES[caste.to_sym]
  end
end
