# frozen_string_literal: true

# Loadouts, primarily for Alchemicals
class CharmLoadout < ApplicationRecord
  include Broadcastable
  include CharacterTrait
  include RankedModel

  has_many :charm_slots, dependent: :destroy
  has_many :charms, through: :charm_slots

  ranks :sorting, with_same: :character_id

  before_validation :ensure_only_one_active

  def ensure_only_one_active
    return unless will_save_change_to_attribute?(:active)

    return unless active

    character.charm_loadouts.where(active: true).where.not(id: id).update(active: false)
  end

  def entity_type
    'charm_loadout'
  end
end
