# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  include Broadcastable
  include Sortable

  belongs_to :sorcerer, polymorphic: true

  alias_attribute :character, :sorcerer
  alias_attribute :character_id, :sorcerer_id
  delegate :player,      to: :character
  delegate :chronicle,   to: :character
  delegate :storyteller, to: :character
  delegate :hidden,      to: :character

  CIRCLES = %w[ terrestrial celestial solar ].freeze

  attribute :ref, :string, default: 'Core p.471-483'

  validates :name, presence: true
  validates :circle, inclusion: { in: CIRCLES }
  validates :cost, presence: true
  validates :duration, presence: true

  before_validation :trim_keywords

  def trim_keywords
    return unless will_save_change_to_attribute? :keywords

    self.keywords = keywords.compact_blank.collect(&:strip).collect(&:downcase).uniq
  end

  def entity_type
    'spell'
  end
  alias_attribute :entity_assoc, :entity_type

  def policy_class
    CharacterTraitPolicy
  end
end
