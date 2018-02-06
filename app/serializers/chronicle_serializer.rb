# frozen_string_literal: true

# app/serializers/chronicle_serializer.rb
class ChronicleSerializer < ActiveModel::Serializer
  attributes :id, :name

  belongs_to :st, type: 'Player'
  has_many :players
  has_many :characters
  has_many :qcs
  has_many :battlegroups

  # We don't need the full associations duplicated under Player, because they're
  #   already included above.
  class PlayerSerializer < ActiveModel::Serializer
    attributes :id, :display_name, :characters, :qcs, :battlegroups

    def characters
      CharacterPolicy::Scope.new(scope, Character).resolve.where(player: object).pluck(:id)
    end

    def qcs
      QcPolicy::Scope.new(scope, Qc).resolve.where(player: object).pluck(:id)
    end

    def battlegroups
      BattlegroupPolicy::Scope.new(scope, Battlegroup).resolve.where(player: object).pluck(:id)
    end
  end
end
