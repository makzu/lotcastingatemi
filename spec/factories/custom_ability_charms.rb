# frozen_string_literal: true

FactoryBot.define do
  factory :custom_ability_charm, parent: :charm do
    ability 'bureaucracy'
    min_ability 2
  end
end
