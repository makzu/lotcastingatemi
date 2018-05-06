# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  before_validation :trim_tags
  before_validation :set_damage_for_elemental_bolt

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: Constants::ATTRIBUTES }
  validates :damage_attr, inclusion: { in: Constants::ATTRIBUTES + ['essence'] }

  def trim_tags
    return unless will_save_change_to_attribute? :tags
    self.tags = tags.reject(&:blank?).collect(&:strip).collect(&:downcase)
  end

  def set_damage_for_elemental_bolt
    return unless will_save_change_to_attribute? :tags
    self.damage_attr = 'essence' if tags.include? 'elemental bolt'
  end

  def entity_type
    'weapon'
  end
  alias_attribute :entity_assoc, :entity_type
end
