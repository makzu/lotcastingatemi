# frozen_string_literal: true

FactoryBot.define do
  factory :qc_charm do
    qc
    name { 'Qc Charm' }
    cost { '2m' }
    keywords { ['eclipse'] }
    min_essence { 1 }
    body { 'MyText' }
    ref { 'MyString' }
    category { 'MyString' }
  end
end
