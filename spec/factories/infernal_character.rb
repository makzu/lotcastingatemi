# frozen_string_literal: true

FactoryBot.define do
  factory :infernal_character, parent: :character, class: 'InfernalCharacter' do
    type { 'InfernalCharacter' }
    caste { 'horizon' }
    caste_abilities { %w[ bureaucracy investigation linguistics lore war ] }
    favored_abilities { %w[ athletics awareness dodge integrity melee ] }
    supernal_ability { 'war' }
    anima_level { 1 }
  end
end
