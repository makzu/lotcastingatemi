# frozen_string_literal: true

# Custom Attribute Exalts, for more flexibility than is allowed to Solars
class CustomAttributeCharacter < Character
  include Exalt

  attribute :exalt_type, :string, default: 'Attribute Exalt'

  validate :caste_attributes_are_valid
  validate :favored_attributes_are_valid

  has_many :custom_attribute_charms, foreign_key: 'character_id', inverse_of: :character, dependent: :destroy
  alias_attribute :charms, :custom_attribute_charms

  def caste_attributes_are_valid
    caste_attributes.each do |a|
      errors.add(:caste_attributes, "#{a} is not a valid attribute") unless Constants::ATTRIBUTES.include? a
    end
  end

  def favored_attributes_are_valid
    favored_attributes.each do |a|
      errors.add(:favored_attributes, "#{a} is not a valid attribute") unless Constants::ATTRIBUTES.include? a
    end
  end

  def custom_exalt?
    true
  end
end
