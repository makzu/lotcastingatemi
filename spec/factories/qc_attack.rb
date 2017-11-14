# frozen_string_literal: true

FactoryBot.define do
  factory :qc_attack do
    association :qc_attackable, factory: :qc
  end
end
