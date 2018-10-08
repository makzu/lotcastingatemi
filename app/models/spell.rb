# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  CIRCLES = %w[ terrestrial celestial solar ].freeze

  attribute :ref, :string, default: 'Core p.471-483'

  validates :name, presence: true
  validates :circle, inclusion: { in: CIRCLES }
  validates :cost, presence: true
  validates :duration, presence: true

  before_validation :trim_keywords

  def trim_keywords
    return unless will_save_change_to_attribute? :keywords

    self.keywords = keywords.reject(&:blank?).collect(&:strip).collect(&:downcase).uniq
  end

  def entity_type
    'spell'
  end
  alias_attribute :entity_assoc, :entity_type
end
