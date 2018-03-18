# frozen_string_literal: true

FactoryBot.define do
  factory :solar_charm, parent: :charm do
    ability 'integrity'
    min_ability 2
  end
end
