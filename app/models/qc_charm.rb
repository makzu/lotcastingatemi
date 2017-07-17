# frozen_string_literal: true

# Individual Charms for QCs.
class QcCharm < ApplicationRecord
  include QcTrait

  validates :min_essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }
end
