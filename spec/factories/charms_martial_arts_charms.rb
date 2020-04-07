# frozen_string_literal: true

FactoryBot.define do
  factory :charms_martial_arts_charm, parent: :charm, class: 'Charms::MartialArtsCharm' do
    type { 'Charms::MartialArtsCharm' }
    style { 'factory style' }
    min_ability { 2 }
  end
end
