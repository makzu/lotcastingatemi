# frozen_string_literal: true

FactoryBot.define do
  factory :charms_spirit_charm, parent: :charm, class: 'Charms::SpiritCharm' do
    type { 'Charms::SpiritCharm' }
    keywords { ['eclipse'] }
  end
end
