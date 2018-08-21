# frozen_string_literal: true

FactoryBot.define do
  factory :custom_essence_character, parent: :character, class: CustomEssenceCharacter do
    type { 'CustomEssenceCharacter' }
    caste { 'custom' }
    exalt_type { 'custom' }
  end
end
