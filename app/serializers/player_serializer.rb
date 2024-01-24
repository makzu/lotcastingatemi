# frozen_string_literal: true

# app/serializers/player_serializer.rb
class PlayerSerializer < BaseSerializer
  attributes :display_name

  # has_many :characters
  # has_many :qcs
  # has_many :battlegroups

  has_many :own_chronicles, type: 'Chronicle', serializer: ::ChronicleSerializer
  has_many :chronicles, serializer: ::ChronicleSerializer

  # We only really need the ID for Chronicles, as each Chronicle will be fetched
  #   later by the client anyway.
  class ChronicleSerializer < BaseSerializer
    attributes :st_id, :name, :players

    def players
      object.player_ids
    end
  end
end
