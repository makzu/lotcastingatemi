# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class ChronicleSerializer < ActiveModel::Serializer
  attributes :id, :st_id, :name
  attribute :invite_code, if: :storyteller?

  belongs_to :st, class: Player

  has_many :players

  has_many :characters
  has_many :qcs
  has_many :battlegroups

  def storyteller?
    current_player.id == object.st_id
  end

  # We don't need the full associations duplicated under Player, because they're
  #   already included above.
  class PlayerSerializer < ActiveModel::Serializer
    attributes :id, :display_name # , :characters, :qcs, :battlegroups, :chronicles, :own_chronicles

    # Give just the IDs of the associations, that's all we need
    class IdSerializer < ActiveModel::Serializer
      attribute :id
    end

    class CharacterSerializer < IdSerializer; end
    class QcSerializer < IdSerializer; end
    class BattlegroupSerializer < IdSerializer; end
    class ChronicleSerializer < IdSerializer; end
    class OwnChronicleSerializer < IdSerializer; end
  end
end
