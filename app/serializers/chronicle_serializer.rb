# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class ChronicleSerializer < ActiveModel::Serializer
  attributes :id, :st_id, :name
  attribute :invite_code, if: :storyteller?

  belongs_to :st, class: Player

  has_many :players
  attributes :characters, :qcs, :battlegroups
  def characters
    CharacterPolicy::Scope.new(scope, Character).resolve.where(chronicle: object)
  end

  def qcs
    CharacterPolicy::Scope.new(scope, Qc).resolve.where(chronicle: object)
  end

  def battlegroups
    CharacterPolicy::Scope.new(scope, Battlegroup).resolve.where(chronicle: object)
  end

  def storyteller?
    current_player.id == object.st_id
  end

  # We don't need the full associations duplicated under Player, because they're
  #   already included above.
  class PlayerSerializer < ActiveModel::Serializer
    attributes :id, :display_name, :characters, :qcs, :battlegroups, :chronicles, :own_chronicles

    def characters
      CharacterPolicy::Scope.new(scope, Character).resolve.where(player: object).pluck(:id)
    end

    def qcs
      CharacterPolicy::Scope.new(scope, Qc).resolve.where(player: object).pluck(:id)
    end

    def battlegroups
      CharacterPolicy::Scope.new(scope, Battlegroup).resolve.where(player: object).pluck(:id)
    end

    def chronicles
      ChroniclePolicy::Scope.new(scope, Chronicle).resolve.where(id: object.chronicle_ids).pluck(:id)
    end

    def own_chronicles
      ChroniclePolicy::Scope.new(scope, Chronicle).resolve.where(st: object).pluck(:id)
    end
  end
end
