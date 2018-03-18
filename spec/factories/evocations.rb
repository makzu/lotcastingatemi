# frozen_string_literal: true

FactoryBot.define do
  factory :evocation, parent: :charm do
    artifact_name 'RSpec'
  end
end
