# frozen_string_literal: true

FactoryBot.define do
  factory :charms_ability_charm, parent: :charm, class: 'Charms::AbilityCharm' do
    type { 'Charms::AbilityCharm' }
    ability { 'bureaucracy' }
    min_ability { 2 }
  end
end
