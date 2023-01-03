# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  has_many :poisons, as: :poisonable, dependent: :destroy

  before_validation :trim_tags
  validates :overrides, json: { schema: Schemas::WEAPON_OVERRIDES }
  before_validation :set_traits_for_elemental_bolt

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }
  validates :damage_attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }

  def trim_tags
    return unless will_save_change_to_attribute? :tags

    self.tags = tags.compact_blank.collect(&:strip).collect(&:downcase).uniq
  end

  # Elemental Bolt stats are in WFHW, page 215
  def set_traits_for_elemental_bolt
    return unless will_save_change_to_attribute? :tags

    return unless tags.include?('elemental bolt') && !(tags_was.include? 'elemental bolt')

    overrides[:damage_attribute] = { use: 'essence' }
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
  alias_attribute :entity_assoc, :entity_type
end
