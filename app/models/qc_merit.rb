# frozen_string_literal: true

# Individual merits for QCs.
class QcMerit < ApplicationRecord
  belongs_to :qc
  delegate :player,    to: :qc
  delegate :chronicle, to: :qc

  def character
    qc
  end
end
