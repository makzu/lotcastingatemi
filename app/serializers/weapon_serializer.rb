# frozen_string_literal: true

# app/serializers/weapon_serializer.rb
class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :name,
             :weight, :tags, :is_artifact,
             :ability, :attr
end
