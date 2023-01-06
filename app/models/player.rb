# frozen_string_literal: true

# User account.
class Player < ApplicationRecord
  after_update_commit :broadcast_update

  has_many :identities, dependent: :destroy

  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', inverse_of: :st, dependent: :destroy
  has_many :characters,   dependent: :destroy
  has_many :qcs,          dependent: :destroy
  has_many :battlegroups, dependent: :destroy

  has_many :chronicle_players, dependent: :destroy
  has_many :chronicles, through: :chronicle_players

  validates :email, uniqueness: true, email: true, allow_nil: true

  def all_chronicle_ids
    chronicle_ids + own_chronicle_ids
  end

  def token_payload
    Knock::AuthToken.new(payload: { sub: id })
  end
  delegate :token, to: :token_payload

  def entity_type
    'player'
  end

  def broadcast_update
    UpdateBroadcastJob.perform_later(
      (own_chronicles + chronicles).map { |x| x.player_ids + [x.st_id] }.flatten.uniq,
      self,
      saved_changes.delete_if { |k| %w[email updated_at created_at].include? k }
    )
  end

  def self.find_or_create_from_oauth(auth)
    find_by(email: auth['info']['email']) || create_from_oauth(auth)
  end

  def self.create_from_oauth(auth)
    create(
      display_name: auth['info']['name'],
      email:        auth['info']['email']
    )
  end
end
