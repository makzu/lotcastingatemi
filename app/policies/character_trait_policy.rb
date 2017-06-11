# frozen_string_literal: true

# Authorization policy for traits attached to Characters, like merits or Charms
# Allows for characters to be edited by the ST of a campaign
class CharacterTraitPolicy < ApplicationPolicy
  attr_reader :player, :trait

  def initialize(player, trait)
    @player = player
    @trait = trait
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
    player == trait.character.player
  end

  def player_in_chronicle?
    false unless trait.character.chronicle
    trait.character.chronicle.players.include? player
  end

  def player_is_st?
    false unless trait.character.chronicle
    trait.character.chronicle.st == player
  end

  # class Scope < Scope
  #   def resolve
  #     scope
  #   end
  # end
end
