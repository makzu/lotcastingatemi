# frozen_string_literal: true

# app/serializers/player_serializer.rb
class PlayerSerializer < ActiveModel::Serializer
  attributes :id, :display_name

  has_many :characters
  has_many :qcs
  has_many :battlegroups

  has_many :own_chronicles, type: 'Chronicle'
  has_many :chronicles

  # We only really need the ID for Chronicles, as each Chronicle will be fetched
  #   later by the client anyway.
  class ChronicleSerializer < ActiveModel::Serializer
    attribute :id
  end
end
