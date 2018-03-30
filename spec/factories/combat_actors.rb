FactoryBot.define do
  factory :combat_actor do
    initiative 1
    onslaught 1
    damage_bashing 1
    damage_lethal 1
    damage_aggravated 1
    willpower_temporary 1
    chronicle
    player
    association :actor, factory: :qc
  end

  factory :battlegroup_combat_actor, class: CombatActor do
    initiative 1
    onslaught 1
    damage_bashing 1
    damage_lethal 1
    damage_aggravated 1
    willpower_temporary 1
    chronicle
    player
    association :actor, factory: :battlegroup
  end
end
