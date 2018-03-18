# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  CIRCLES = %w[ terrestrial celestial solar ].freeze

  validates :name, presence: true
  validates :circle, inclusion: { in: CIRCLES }
  validates :cost, presence: true
  validates :duration, presence: true

  def entity_type
    'spell'
  end

  def entity_assoc
    entity_type
  end
end
