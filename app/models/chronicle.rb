# frozen_string_literal: true

# Represents an individual game.
class Chronicle < ApplicationRecord
  after_update_commit :broadcast_update
  before_destroy :remove_characters
  before_destroy :broadcast_destroy

  belongs_to :st, class_name: 'Player'
  alias storyteller st

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

  # TODO: Merge this into Broadcastable?
  def broadcast_update
    changes = saved_changes.dup.transform_values(&:last)

    UpdateBroadcastJob.perform_later(
      ([st_id] + player_ids),
      self,
      changes.delete_if { |k| %w[created_at updated_at].include? k }
    )
  end

  def remove_characters
    characters.clear
    qcs.clear
    battlegroups.clear
  end

  def broadcast_destroy
    DestroyBroadcastJob.perform_later(([st_id] + player_ids), self, st.entity_type, st)
  end

  def entity_type
    'chronicle'
  end
  alias entity_assoc entity_type
end
