# frozen_string_literal: true

FactoryBot.define do
  factory :identity do
    provider 'MyString'
    name 'MyString'
    email 'MyString'
    image 'MyString'
    uid 'MyString'
    player
  end
end
