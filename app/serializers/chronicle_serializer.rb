# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class ChronicleSerializer < BaseSerializer
  attributes :st_id, :name, :notes
  attributes :invite_code, if: :storyteller?

  belongs_to :st, serializer: PlayerSerializer

  has_many :players, serializer: PlayerSerializer

  has_many :characters, serializer: CharacterSerializer
  has_many :qcs, serializer: QcSerializer
  has_many :battlegroups, serializer: BattlegroupSerializer

  def storyteller?
    current_player.id == chronicle.st_id
  end

  def current_player
    options.fetch(:current_player)
  end

  # We don't need the full associations duplicated under Player, because they're
  #   already included above.
  class PlayerSerializer < BaseSerializer
    attributes :display_name # , :characters, :qcs, :battlegroups, :chronicles, :own_chronicles

    # Give just the IDs of the associations, that's all we need
    class IdSerializer < Oj::Serializer
      attributes :id
    end

    class CharacterSerializer < IdSerializer; end
    class QcSerializer < IdSerializer; end
    class BattlegroupSerializer < IdSerializer; end
    class ChronicleSerializer < IdSerializer; end
    class OwnChronicleSerializer < IdSerializer; end
  end
end
