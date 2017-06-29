# frozen_string_literal: true

FactoryGirl.define do
  factory :qc_charm do
    qc
    name "MyString"
    cost "MyString"
    keywords ["MyString"]
    min_essence 1
    body "MyText"
    ref "MyString"
    category "MyString"
  end
end
