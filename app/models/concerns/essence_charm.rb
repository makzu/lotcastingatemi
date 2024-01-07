# frozen_string_literal: true

# Common validations for all Charms and QC Charms
module EssenceCharm
  extend ActiveSupport::Concern

  CHARM_TIMINGS = %w[ simple supplemental reflexive permanent supplemental/reflexive ].freeze

  included do
    normalizes :keywords, with: method(:trim_array_attribute)

    # Essence above 5 is explicitly mentioned in the book
    validates :min_essence, one_thru_ten_stat: true

    validates :timing, inclusion: { in: CHARM_TIMINGS }
  end
end
