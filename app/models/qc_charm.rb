# frozen_string_literal: true

# Individual Charms for QCs.
class QcCharm < ApplicationRecord
  include Broadcastable
  include QcTrait
  include EssenceCharm

  def entity_type
    'qc_charm'
  end
  alias_attribute :entity_assoc, :entity_type
end
