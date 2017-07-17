# frozen_string_literal: true

# app/serializers/player_serializer.rb
class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :characters
  has_many :qcs
  has_many :battlegroups

  has_many :own_chronicles, serializer: ChronicleSerializer
  has_many :chronicles
end
