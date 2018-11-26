# frozen_string_literal: true

# Custom Essence-based Exalts, like 2e Infernals
class CustomEssenceCharacter < Character
  include Exalt
  include CustomExalt

  attribute :exalt_type, :string, default: 'Essence Exalt'

  alias_attribute :charms, :essence_charms

  def self.from_character!(character)
    new_cha = character.becomes(CustomEssenceCharacter)
    new_cha.type = 'CustomEssenceCharacter'
    new_cha.caste_attributes = []
    new_cha.favored_attributes = []
    new_cha.favored_abilities = []
    new_cha.supernal_ability = nil
    new_cha.save!
    (new_cha.attribute_charms + new_cha.ability_charms).each do |charm|
      EssenceCharm.from_charm!(charm)
    end
    new_cha
  end
end
