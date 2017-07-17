# frozen_string_literal: true

# User account.
class Player < ApplicationRecord
  has_secure_password

  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', dependent: :destroy
  has_many :characters,   dependent: :destroy
  has_many :qcs,          dependent: :destroy
  has_many :battlegroups, dependent: :destroy

  has_many :chronicle_players
  has_many :chronicles, through: :chronicle_players

  validates :email, uniqueness: true, email: true

  # Exclude password digest from any json output
  def as_json(options = {})
    options[:except] ||= []
    options[:except] << :password_digest

    super(options)
  end

  # Make knock login requests case-insensitive for email
  # Innards shamelessly stolen from:
  # https://robb.weblaws.org/2013/12/05/yes-rails-supports-case-insensitive-database-queries/
  def self.from_token_request(request)
    p = Player.arel_table
    email = request.params['auth'] && request.params['auth']['email']
    Player.find_by(p[:email].matches(email))
  end
end
