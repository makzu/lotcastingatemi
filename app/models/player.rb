# frozen_string_literal: true

# User account.
class Player < ApplicationRecord
  has_secure_password
  has_many :identities, dependent: :destroy

  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', dependent: :destroy
  has_many :characters,   dependent: :destroy
  has_many :qcs,          dependent: :destroy
  has_many :battlegroups, dependent: :destroy

  has_many :chronicle_players
  has_many :chronicles, through: :chronicle_players

  validates :email, uniqueness: true, email: true, allow_nil: true
  validates :username, uniqueness: true

  def all_chronicle_ids
    chronicle_ids + own_chronicle_ids
  end

  def self.from_token_request(request)
    name = request.params['auth'] && request.params['auth']['username']
    Player.find_by(username: name)
  end

  def token
    Knock::AuthToken.new(payload: { sub: id }).token
  end

  def self.create_from_oauth(auth)
    create(
      display_name: auth['info']['name'],
      email: auth['info']['email'],
      username: auth['info']['email'],
      password: auth['uid'],
      password_confirmation: auth['uid']
    )
  end
end
