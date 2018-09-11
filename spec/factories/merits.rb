# frozen_string_literal: true

FactoryBot.define do
  factory :merit do
    character
    rating { 3 }
    merit_name { 'Merit' }
    merit_cat { 'story' }
  end
end
