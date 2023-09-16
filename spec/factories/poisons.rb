# frozen_string_literal: true

FactoryBot.define do
  factory :poison do
    poisonable factory: %i[character]
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
    poisonable factory: %i[qc]
  end

  factory :battlegroup_poison, parent: :poison do
    poisonable factory: %i[battlegroup]
  end

  factory :combat_actor_poison, parent: :poison do
    poisonable factory: %i[combat_actor]
  end
end
