# frozen_string_literal: true

# Holds traits specific to Battlegroups, as defined starting at Core p.205.
#   They must be linked with a QC that represents the average member's stats.
class Battlegroup < ApplicationRecord
  belongs_to :qc
  delegate :player, to: :qc
  delegate :chronicle, to: :qc

  validates :size, zero_thru_five_stat: true

  validates :might, inclusion: { in: 0..3, message: 'might must be between 0 and 3' }
  validates :drill, inclusion: { in: 1..3, message: 'drill must be between 1 (poor) and 3 (elite)' }
end
