# frozen_string_literal: true

FactoryBot.define do
  factory :martial_arts_charm, parent: :charm do
    style 'factory style'
    min_ability 2
  end
end
