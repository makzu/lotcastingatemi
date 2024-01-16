# frozen_string_literal: true

# Spells!  For sorcerers.
# DEPRECATED ATTRIBUTES:
# sort_order, in favor of sorting via ranked_model
class Spell < ApplicationRecord
  include Broadcastable
  include RankedModel

  ranks :sorting, with_same: :sorcerer_id

  belongs_to :sorcerer, touch: true, polymorphic: true

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
