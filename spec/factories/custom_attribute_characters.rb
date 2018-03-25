# frozen_string_literal: true

FactoryBot.define do
  factory :custom_attribute_character, parent: :character, class: CustomAttributeCharacter do
    type 'CustomAttributeCharacter'
    caste 'custom'
    exalt_type 'custom'
    excellencies_for %w[strength intelligence]
  end
end
