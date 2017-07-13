# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  CIRCLES = %w[ terrestrial celestial solar ].freeze
  include CharacterTrait

  validates :name, presence: true
  validates :circle, inclusion: { in: CIRCLES }
  validates :cost, presence: true
  validates :duration, presence: true
  validates :ref, presence: true
end
