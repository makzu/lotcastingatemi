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
    false unless character.chronicle
    character.chronicle.players.include? player
  end

  def player_is_st?
    false unless character.chronicle
    character.chronicle.st == player
  end

  # Authorization scopes for Characters.
  class Scope < Scope
    def resolve
      scope
    end
  end
end
