# frozen_string_literal: true

FactoryBot.define do
  factory :charms_attribute_charm, parent: :charm, class: 'Charms::AttributeCharm' do
    type 'Charms::AttributeCharm'
    ability 'strength'
    min_ability 2
  end
end
