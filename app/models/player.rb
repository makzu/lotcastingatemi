class Player < ActiveRecord::Base
  has_many :own_chronicles, class_name: 'Chronicle', foreign_key: 'st_id', dependent: :destroy
  has_many :characters, dependent: :destroy
  has_many :qcs,        dependent: :destroy

  has_many :chronicle_players
  has_many :chronicles, through: :chronicle_players
end
