class Qc < ApplicationRecord
  belongs_to :player
  belongs_to :chronicle

  has_many :qc_merits
end
