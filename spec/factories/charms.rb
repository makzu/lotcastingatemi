# frozen_string_literal: true

FactoryBot.define do
  factory :charm do
    character
    min_essence 1
  end
end
