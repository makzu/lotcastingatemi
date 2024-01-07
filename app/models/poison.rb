# frozen_string_literal: true

# Model for Poisons, as described starting in Core p.232
class Poison < ApplicationRecord
  include Broadcastable
  include Sortable

  belongs_to :poisonable, polymorphic: true

  alias character poisonable
  delegate :player,      to: :character
  delegate :chronicle,   to: :character
  delegate :storyteller, to: :character
  delegate :hidden,      to: :character

  def entity_type
    'poison'
  end
  alias entity_assoc entity_type

  def policy_class
    CharacterTraitPolicy
  end
end
