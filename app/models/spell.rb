# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  CIRCLES = %w[ emerald sapphire adamant ].freeze

  validates :name, presence: true
  validates :circle, inclusion: { in: CIRCLES }
  validates :cost, presence: true
  validates :duration, presence: true

  def entity_type
    'spell'
  end
end
