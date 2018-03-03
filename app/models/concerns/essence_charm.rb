# frozen_string_literal: true

# Common validations for all Charms
module EssenceCharm
  extend ActiveSupport::Concern

  CHARM_TIMINGS = %w[ simple supplemental reflexive permanent ].freeze

  included do
    # Essence above 5 is explicitly mentioned in the book
    validates :min_essence, numericality: {
      greater_than_or_equal_to: 1, less_than_or_equal_to: 10
    }

    validates :timing, inclusion: { in: CHARM_TIMINGS }
  end
end
