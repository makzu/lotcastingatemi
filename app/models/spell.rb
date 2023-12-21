# frozen_string_literal: true

# Spells!  For sorcerers.
class Spell < ApplicationRecord
  include Broadcastable
  include RankedModel

  ranks :sorting, with_same: :sorcerer_id

  belongs_to :sorcerer, polymorphic: true

  alias character sorcerer
  alias character= sorcerer=

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

  normalizes :keywords, with: method(:trim_array_attribute)

  def entity_type
    'spell'
  end
  alias entity_assoc entity_type

  def policy_class
    CharacterTraitPolicy
  end
end
