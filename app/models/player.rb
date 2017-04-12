# frozen_string_literal: true

class Player < ActiveRecord::Base
  has_secure_password
  validates :email, uniqueness: true

  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', dependent: :destroy
  has_many :characters, dependent: :destroy
  has_many :qcs,        dependent: :destroy

  has_many :chronicle_players
  has_many :chronicles, through: :chronicle_players

  # Exclude password from any json output
  def as_json(options = {})
    options[:except] ||= [:password_digest]
    super(options)
  end
end
