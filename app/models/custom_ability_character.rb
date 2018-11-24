# frozen_string_literal: true

# Custom Ability Exalts, for more flexibility than is allowed to Solars
class CustomAbilityCharacter < Character
  include AbilityExalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Ability Exalt'

  def self.from_character!(character)
    new_cha = character.becomes(CustomAbilityCharacter)
    new_cha.type = 'CustomAbilityCharacter'
    new_cha.caste_attributes = []
    new_cha.favored_attributes = []
    new_cha.save!
    (new_cha.attribute_charms + new_cha.essence_charms).each do |charm|
      AbilityCharm.from_charm!(charm)
    end
    new_cha
  end
end
