# frozen_string_literal: true

# Authorization policy for Chronicles
class ChroniclePolicy < ApplicationPolicy
  attr_reader :player, :chronicle

  def initialize(player, chronicle)
    @player = player
    @chronicle = chronicle
  end

  def create?
    player_is_storyteller?
  end

  def show?
    player_is_storyteller? || player_in_chronicle?
  end

  def update?
    player_is_storyteller?
  end

  def regen_invite_code?
    update?
  end

  def remove_player?
    update?
  end

  def destroy?
    player_is_storyteller?
  end

  def player_is_storyteller?
    chronicle.storyteller == player
  end

  def player_in_chronicle?
    chronicle.players.include? player
  end

  # Authorization scope:
  class Scope < Scope
    attr_reader :player, :scope

    def initialize(player, scope)
      @player = player
      @scope = scope
    end

    def resolve
      scope.where(st: @player).or(scope.where(id: @player.chronicle_ids))
    end
  end
end
