# frozen_string_literal: true

# Stores traits for individual weapons.
class Weapon < ApplicationRecord
  include Broadcastable
  include CharacterTrait

  before_validation :trim_tags

  validates :weight, inclusion: { in: %w[ light medium heavy ] }
  validates :attr, inclusion: { in: Constants::ATTRIBUTES }
  validates :damage_attr, inclusion: { in: Constants::ATTRIBUTES }

  def trim_tags
    return unless will_save_change_to_attribute? :tags
    self.tags = tags.reject(&:blank?).collect(&:strip)
  end

  def entity_type
    'weapon'
  end

  def entity_assoc
    entity_type
  end
end
