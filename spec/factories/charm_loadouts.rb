# frozen_string_literal: true

FactoryBot.define do
  factory :charm_loadout do
    character
    active { false }
    name { 'MyString' }
  end
end
