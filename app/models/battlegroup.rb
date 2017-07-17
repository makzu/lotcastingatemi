# frozen_string_literal: true

# Holds traits specific to Battlegroups, as defined starting at Core p.205.
class Battlegroup < ApplicationRecord
  belongs_to :player
  belongs_to :chronicle

  has_many :qc_attacks, as: :qc_attackable

  validates :size, zero_thru_five_stat: true

  validates :might, inclusion: { in: 0..3, message: 'might must be between 0 and 3' }
  validates :drill, inclusion: { in: 0..2, message: 'drill must be between 0 (poor) and 2 (elite)' }
end
