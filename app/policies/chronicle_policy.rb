# frozen_string_literal: true

# Authorization policy for Chronicles
class ChroniclePolicy < ApplicationPolicy
  attr_reader :player, :chronicle

  def initialize(player, chronicle)
    @player = player
    @chronicle = chronicle
  end

  def show?
    player_is_st? || player_in_chronicle?
  end

  def update?
    player_is_st?
  end

  def destroy?
    player_is_st?
  end

  def player_is_st?
    chronicle.st == player
  end

  def player_in_chronicle?
    chronicle.players.include? player
  end
end
