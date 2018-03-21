# frozen_string_literal: true

FactoryBot.define do
  factory :dragonblood_charm, parent: :charm, class: DragonbloodCharm do
    type 'DragonbloodCharm'
    ability 'lore'
    min_ability 3
  end
end
