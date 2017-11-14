# frozen_string_literal: true

FactoryBot.define do
  factory :solar_charm do
    character
    ability 'integrity'
    min_ability 2
  end
end
