# frozen_string_literal: true

class QcAttack < ApplicationRecord
  belongs_to :qc

  validates :pool, :damage, :overwhelming, numericality: { greater_than: 0 }
end
