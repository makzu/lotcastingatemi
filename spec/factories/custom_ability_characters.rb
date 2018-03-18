# frozen_string_literal: true

FactoryBot.define do
  factory :custom_ability_character, parent: :character, class: CustomAbilityCharacter do
    aspect true
    caste 'custom'
    exalt_type 'custom'
  end
end
