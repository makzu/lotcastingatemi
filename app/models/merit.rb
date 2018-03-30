# frozen_string_literal: true

# Individual merits for characters. QC merits have their own model.
class Merit < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  validates :merit_cat, inclusion: { in: %w[ story innate purchased ] }

  # 6 is treated as N/A.
  validates :rating, numericality: {
    greater_than_or_equal_to: 0, less_than_or_equal_to: 6
  }

  def entity_type
    'merit'
  end

  def entity_assoc
    entity_type
  end
end
