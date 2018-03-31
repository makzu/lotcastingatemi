# frozen_string_literal: true

# app/serializers/weapon_serializer.rb
class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :name, :sort_order,
             :weight, :tags, :is_artifact,
             :ability, :attr, :damage_attr
end
