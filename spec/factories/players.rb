# frozen_string_literal: true

FactoryGirl.define do
  factory :player, aliases: [:st] do
    display_name 'test player'
    sequence(:username, 100) { |n| "test#{n}" }
    sequence(:email, 100) { |n| "test#{n}@example.com" }
    password 'password'
  end
end
