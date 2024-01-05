# frozen_string_literal: true

FactoryBot.define do
  factory :combat_actor do
    initiative { 1 }
    onslaught { 1 }
    damage_bashing { 1 }
    damage_lethal { 1 }
    damage_aggravated { 1 }
    willpower_temporary { 1 }
    chronicle
    player
    actor factory: %i[qc]
  end

  factory :battlegroup_combat_actor, class: 'CombatActor' do
    initiative { 1 }
    onslaught { 1 }
    damage_bashing { 1 }
    damage_lethal { 1 }
    damage_aggravated { 1 }
    willpower_temporary { 1 }
    chronicle
    player
    actor factory: %i[battlegroup]
  end
end
