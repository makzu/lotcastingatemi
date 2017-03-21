class Chronicle < ApplicationRecord
  belongs_to :player

  has_many :characters
  has_many :qcs
end
