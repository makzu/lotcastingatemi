class Chronicle < ApplicationRecord
  belongs_to :player
  alias_attribute :st, :player

  has_many :characters
  has_many :qcs
end
