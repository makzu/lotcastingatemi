# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :name,
             :weight, :tags, :is_artifact,
             :ability, :attr
end
