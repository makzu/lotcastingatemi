# frozen_string_literal: true

# Individual merits for QCs.
# DEPRECATED ATTRIBUTES:
# sort_order, in favor of sorting via ranked_model
class QcMerit < ApplicationRecord
  include Broadcastable
  include QcTrait
  include RankedModel

  ranks :sorting, with_same: :qc_id

  def entity_type
    'qc_merit'
  end
  alias entity_assoc entity_type
end
