# frozen_string_literal: true

FactoryBot.define do
  factory :sidereal_character, parent: :character, class: 'SiderealCharacter' do
    type { 'SiderealCharacter' }
    caste { 'battles' }
    caste_abilities { %w[ archery brawl melee presence war ] }
    favored_abilities { %w[ bureaucracy ride sail socialize survival] }
    anima_level { 1 }
  end
end
