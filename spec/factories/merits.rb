# frozen_string_literal: true

FactoryBot.define do
  factory :merit do
    character
    rating 3
    merit_name 'Merit'
    merit_cat 'story'
  end

  factory :invalid_merit, class: Merit do
    character
    rating
    merit_name
    merit_cat
  end
end
