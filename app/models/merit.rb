# frozen_string_literal: true

# Individual merits for characters. QC merits have their own model.
class Merit < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  validates :merit_cat, inclusion: { in: %w[ story innate purchased ] }

  # TODO: support for Artifact N/A or ratings above 5?
  validates :rating, zero_thru_five_stat: true

  def entity_type
    'merit'
  end

  def entity_assoc
    entity_type
  end
end
