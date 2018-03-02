# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include CharacterTrait

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: ATTRIBUTES }
end
