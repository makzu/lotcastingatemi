# frozen_string_literal: true

FactoryBot.define do
  factory :solar_charm, parent: :charm, class: SolarCharm do
    type 'SolarCharm'
    ability 'integrity'
    min_ability 2
  end
end
