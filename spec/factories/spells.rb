# frozen_string_literal: true

FactoryBot.define do
  factory :spell do
    character
    name "MyString"
    circle 'emerald'
    cost "MyString"
    keywords ["MyString"]
    body "MyText"
    ref "MyString"
    duration "MyString"
  end
end
