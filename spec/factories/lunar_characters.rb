# frozen_string_literal: true

FactoryBot.define do
  factory :lunar_character, parent: :character, class: 'LunarCharacter' do
    type { 'LunarCharacter' }
    caste { 'full moon' }
  end
end
