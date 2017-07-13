# frozen_string_literal: true

# Superclass for Charms
class Charm < ApplicationRecord
  CHARM_TIMINGS = %w[ simple supplemental reflexive permanant ].freeze

  include CharacterTrait

  # Essence above 5 is explicitly mentioned in the book
  validates :min_essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }

  validates :timing, inclusion: { in: CHARM_TIMINGS }
end
