# frozen_string_literal: true

FactoryBot.define do
  factory :evocation, parent: :charm, class: Evocation do
    type 'Evocation'
    artifact_name 'RSpec'
  end
end
