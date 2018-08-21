# frozen_string_literal: true

FactoryBot.define do
  factory :charms_evocation, parent: :charm, class: Charms::Evocation do
    type { 'Charms::Evocation' }
    artifact_name { 'RSpec' }
  end
end
