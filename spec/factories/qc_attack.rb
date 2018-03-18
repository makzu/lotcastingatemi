# frozen_string_literal: true

FactoryBot.define do
  factory :qc_attack do
    association :qc_attackable, factory: :qc
    pool 1
    damage 2
    range 'close'
  end

  factory :battlegroup_qc_attack, class: QcAttack do
    association :qc_attackable, factory: :battlegroup
    pool 1
    damage 2
    range 'close'
  end
end
