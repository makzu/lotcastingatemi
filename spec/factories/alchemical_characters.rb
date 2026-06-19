# frozen_string_literal: true

FactoryBot.define do
  factory :alchemical_character, parent: :character, class: 'AlchemicalCharacter' do
    type { 'AlchemicalCharacter' }
    caste { 'orichalcum' }
  end
end
