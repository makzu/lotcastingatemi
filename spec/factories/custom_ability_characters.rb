# frozen_string_literal: true

FactoryBot.define do
  factory :custom_ability_character, parent: :character, class: CustomAbilityCharacter do
    type { 'CustomAbilityCharacter' }
    aspect { true }
    caste { 'custom' }
    exalt_type { 'custom' }
    excellencies_for { %w[bureaucracy war] }
  end
end
