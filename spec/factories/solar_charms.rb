# frozen_string_literal: true

FactoryGirl.define do
  factory :solar_charm do
    character
    ability 'integrity'
    min_ability 2
  end
end
