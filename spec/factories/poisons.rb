# frozen_string_literal: true

FactoryBot.define do
  factory :poison do
    association :poisonable, factory: :character
    name { 'MyString' }
    penalty { 1 }
    interval { 'MyString' }
    damage { 1 }
    damage_type { 'MyString' }
    crash_damage_type { 'MyString' }
    notes { 'MyText' }
    vector { 'MyString' }
    duration { '' }
    duration_type { 'MyString' }
  end

  factory :qc_poison, parent: :poison do
    association :poisonable, factory: :qc
  end

  factory :battlegroup_poison, parent: :poison do
    association :poisonable, factory: :battlegroup
  end

  factory :combat_actor_poison, parent: :poison do
    association :poisonable, factory: :combat_actor
  end
end
