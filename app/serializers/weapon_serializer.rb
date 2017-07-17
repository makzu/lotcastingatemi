# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class WeaponSerializer < ActiveModel::Serializer
  attributes :id, :character_id, :name, :ability, :weight, :tags, :is_artifact
end
