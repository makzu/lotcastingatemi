# frozen_string_literal: true

# Represents individual attack pools for QCs.  Battlegroups take these numbers
# and add their own bonuses.
class QcAttack < ApplicationRecord
  belongs_to :qc

  validates :pool, :damage, :overwhelming, numericality: { greater_than: 0 }
end
