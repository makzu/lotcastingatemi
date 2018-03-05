# frozen_string_literal: true

# Represents an individual game.
class Chronicle < ApplicationRecord
  belongs_to :st, class_name: 'Player'
  alias_attribute :storyteller, :st

  has_secure_token :invite_code

  has_many :characters
  has_many :qcs
  has_many :battlegroups

  has_many :chronicle_players, dependent: :destroy
  has_many :players, through: :chronicle_players

  def remove_player(player)
    characters.delete(player.characters.where(chronicle_id: id))
    qcs.delete(player.qcs.where(chronicle_id: id))
    battlegroups.delete(player.battlegroups.where(chronicle_id: id))
    players.delete(player)
    save!
  end
end
