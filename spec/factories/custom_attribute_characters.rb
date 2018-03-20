# frozen_string_literal: true

FactoryBot.define do
  factory :custom_attribute_character, parent: :character, class: CustomAttributeCharacter do
    type 'CustomAttributeCharacter'
  end
end
