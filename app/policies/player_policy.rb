# frozen_string_literal: true

# Authorization policy for the Player model itself
class PlayerPolicy < ApplicationPolicy
  attr_reader :player, :player_model

  def initialize(player, player_model)
    @player = player
    @player_model = player_model
  end

  def index?
    self?
  end

  def show?
    self?
  end

  def update?
    self?
  end

  def destroy?
    self?
  end

  def self?
    player == player_model
  end
end
