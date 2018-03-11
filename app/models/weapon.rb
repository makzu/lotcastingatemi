# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: ATTRIBUTES }

  def entity_type
    'weapon'
  end

  def entity_assoc
    entity_type
  end
end
