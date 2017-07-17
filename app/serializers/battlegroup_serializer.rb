# frozen_string_literal: true

# app/serializers/battlegroup_serializer.rb
class BattlegroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :size, :might, :drill, :perfect_morale, :magnitude_current
end
