# frozen_string_literal: true

# Authorization policy for Characters.
# Allows for characters to be edited by the ST of a campaign
class CharacterPolicy < ApplicationPolicy
  attr_reader :player, :character

  def initialize(player, character)
    @player = player
    @character = character
  end

  def show?
    player_is_owner? || player_is_st? || player_in_chronicle?
  end

  def create?
    player_is_owner? || player_is_st?
  end

  def update?
    player_is_owner? || player_is_st?
  end

  def destroy?
    player_is_owner?
  end

  def player_is_owner?
    player == character.player
  end

  def player_in_chronicle?
    return false unless character.chronicle
    character.chronicle.players.include? player
  end

  def player_is_st?
    return false unless character.chronicle
    character.chronicle.st == player
  end

  class Scope < Scope
    attr_reader :player, :scope

    def initialize(player, scope)
      @player = player
      @scope = scope
    end

    def resolve
      scope.where(player: @player).or(scope.where(chronicle_id: @player.all_chronicle_ids))
    end
  end
end
