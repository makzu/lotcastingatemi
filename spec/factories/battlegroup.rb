# frozen_string_literal: true

FactoryBot.define do
  factory :battlegroup do
    name { 'Legion' }
    chronicle
    player
  end
end
