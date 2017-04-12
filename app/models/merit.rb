# frozen_string_literal: true

class Merit < ApplicationRecord
  belongs_to :character

  validates :merit_cat, inclusion: { in: %w[ story innate purchased ] }

  # TODO: support for Artifact N/A or ratings above 5?
  validates :rating, zero_thru_five_stat: true
end
