# frozen_string_literal: true

FactoryBot.define do
  factory :dragonblood_character, parent: :character, class: DragonbloodCharacter do
    type 'DragonbloodCharacter'
    caste 'water'
  end
end
