# frozen_string_literal: true

FactoryBot.define do
  factory :charms_essence_charm, parent: :charm, class: 'Charms::EssenceCharm' do
    type 'Charms::EssenceCharm'
  end
end
