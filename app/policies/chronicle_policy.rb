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

  def destroy?
    player_is_storyteller?
  end

  def player_is_storyteller?
    chronicle.storyteller == player
  end

  def player_in_chronicle?
    chronicle.players.include? player
  end
end
