# frozen_string_literal: true

FactoryBot.define do
  factory :abyssal_character, parent: :character, class: 'AbyssalCharacter' do
    type { 'AbyssalCharacter' }
    caste { 'dusk' }
    caste_abilities { %w[ awareness brawl dodge resistance war ] }
    favored_abilities { %w[ bureaucracy ride sail socialize survival] }
    supernal_ability { 'war' }
    anima_level { 1 }
  end
end
