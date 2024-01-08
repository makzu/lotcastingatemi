# frozen_string_literal: true

# Individual Charms for QCs.
# DEPRECATED ATTRIBUTES:
# sort_order, in favor of sorting via ranked_model
class QcCharm < ApplicationRecord
  include Broadcastable
  include QcTrait
  include EssenceCharm
  include RankedModel

  ranks :sorting, with_same: :qc_id

  def entity_type
    'qc_charm'
  end
  alias entity_assoc entity_type
end
