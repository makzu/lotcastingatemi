# frozen_string_literal: true

# app/serializers/combat_actor_serializer.rb
class CombatActorSerializer < PlayerAssetSerializer
  attributes :name,
             :willpower_temporary,
             :damage_bashing, :damage_lethal, :damage_aggravated,
             :motes_personal_current,
             :motes_peripheral_current,
             :anima_level

  attribute :actor_id
  has_many :poisons
end
