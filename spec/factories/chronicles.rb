# frozen_string_literal: true

FactoryBot.define do
  factory :chronicle do
    name { 'Chronicle' }
    sequence(:invite_code) { |n| "test#{n}" }
    st
  end
end
