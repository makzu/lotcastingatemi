# frozen_string_literal: true

# app/serializers/weapon_serializer.rb
class WeaponSerializer < CharacterTraitSerializer
  attributes :name, :weight, :tags, :is_artifact,
             :ability, :attr, :damage_attr
end
