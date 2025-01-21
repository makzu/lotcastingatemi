# frozen_string_literal: true

# Join model for Charm Loadouts to have Charms
class CharmSlot < ApplicationRecord
  belongs_to :charm_loadout, touch: true
  belongs_to :charm, touch: true

  delegate :character, to: :charm_loadout

  validate :charm_also_belongs_to_character

  def charm_also_belongs_to_character
    return if character.charms.include?(charm)

    errors.add(:charm, 'must belong to character')
  end
end
