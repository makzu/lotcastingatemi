# frozen_string_literal: true

# app/serializers/combat_actor_serializer.rb
class CombatActorSerializer < ActiveModel::Serializer
  attributes :id, :name, :type,
             :willpower_temporary,
             :damage_bashing, :damage_lethal, :damage_aggravated,
             :motes_personal_current,
             :motes_peripheral_current,
             :anima_level,
             :initiative, :onslaught, :has_acted

  attribute :player_id
  attribute :chronicle_id
  attribute :actor_id
end
