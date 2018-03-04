# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class ChronicleSerializer < ActiveModel::Serializer
  attributes :id, :name, :invite_code
  attribute :invite_code, if: :st?

  belongs_to :st, type: 'Player'
  has_many :players
  has_many :characters
  has_many :qcs
  has_many :battlegroups

  def st?
    current_player.id == object.st_id
  end

  # We don't need the full associations duplicated under Player, because they're
  #   already included above.
  class PlayerSerializer < ActiveModel::Serializer
    attributes :id, :display_name, :characters, :qcs, :battlegroups

    def characters
      CharacterPolicy::Scope.new(scope, Character).resolve.where(player: object).pluck(:id)
    end

    def qcs
      CharacterPolicy::Scope.new(scope, Qc).resolve.where(player: object).pluck(:id)
    end

    def battlegroups
      CharacterPolicy::Scope.new(scope, Battlegroup).resolve.where(player: object).pluck(:id)
    end
  end
end
