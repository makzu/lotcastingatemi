# frozen_string_literal: true

# Individual merits for QCs.
class QcMerit < ApplicationRecord
  belongs_to :qc
end
