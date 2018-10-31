# frozen_string_literal: true

# Custom Attribute Exalts, for more flexibility than is allowed to Solars
class CustomAttributeCharacter < Character
  include AttributeExalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Attribute Exalt'

  def self.from_character!(character)
    new_cha = character.becomes(CustomAttributeCharacter)
    new_cha.type = 'CustomAttributeCharacter'
    new_cha.caste_abilities = []
    new_cha.supernal_ability = nil
    new_cha.save!
    (new_cha.ability_charms + new_cha.essence_charms).each do |charm|
      AttributeCharm.from_charm!(charm)
    end
    new_cha
  end
end
