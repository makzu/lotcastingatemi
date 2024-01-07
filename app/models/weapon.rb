# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  has_many :poisons, as: :poisonable, dependent: :destroy

  normalizes :tags, with: method(:trim_array_attribute)

  before_validation :set_traits_for_elemental_bolt

  validates :overrides, json: { schema: Schemas::WEAPON_OVERRIDES }
  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }
  validates :damage_attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }

  # Elemental Bolt stats are in WFHW, page 215
  def set_traits_for_elemental_bolt
    return unless will_save_change_to_attribute? :tags

    return unless tags.include?('elemental bolt') && tags_was.exclude?('elemental bolt')

    overrides['damage_attribute'] = { 'use' => 'essence' }
    self.is_artifact = true
    self.weight = 'light'
    if character.abil_archery > character.abil_thrown
      self.ability = 'archery'
    elsif character.abil_thrown >= character.abil_archery
      self.ability = 'thrown'
    end
  end

  def entity_type
    'weapon'
  end
  alias entity_assoc entity_type
end
