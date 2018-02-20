# frozen_string_literal: true

# Individual Charms for QCs.
class QcCharm < ApplicationRecord
  include QcTrait
  include EssenceCharm
end
