# frozen_string_literal: true

FactoryBot.define do
  factory :player, aliases: [:st] do
    display_name { 'test player' }
    sequence(:email, 100) { |n| "test#{n}@example.com" }
  end
end
