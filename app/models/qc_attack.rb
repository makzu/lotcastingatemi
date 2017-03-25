class QcAttack < ApplicationRecord
  belongs_to :qc

  validates_inclusion_of :name

  validates_numericality_of :pool, :damage, :overwhelming, greater_than: 0
end
