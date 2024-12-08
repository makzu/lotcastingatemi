# frozen_string_literal: true

# Loadouts, primarily for Alchemicals
class CharmLoadout < ApplicationRecord
  include Broadcastable
  include CharacterTrait
  has_many :charm_slots, dependent: :destroy
  has_many :charms, through: :charm_slots

  before_validation :ensure_only_one_active

  def ensure_only_one_active
    return unless will_save_change_to_attribute?(:active)

    return unless active

    character.charm_loadouts.where(active: true).where.not(id: id).update(active: false)
  end
end
