# frozen_string_literal: true

# Represents individual attack pools for QCs.  Battlegroups take these numbers
# and add their own bonuses.
class QcAttack < ApplicationRecord
  include Broadcastable
  include Sortable
  belongs_to :qc_attackable, polymorphic: true
  alias_attribute :character, :qc_attackable

  has_many :poisons, as: :poisonable, dependent: :destroy

  delegate :player,      to: :qc_attackable
  delegate :chronicle,   to: :qc_attackable
  delegate :storyteller, to: :qc_attackable
  delegate :hidden,      to: :qc_attackable

  before_validation :trim_tags
  validates :pool, :damage, :overwhelming, numericality: { greater_than: 0 }

  def trim_tags
    return unless will_save_change_to_attribute? :tags

    self.tags = tags.compact_blank.collect(&:strip).collect(&:downcase).uniq
  end

  def entity_type
    'qc_attack'
  end
  alias entity_assoc entity_type

  def self.policy_class
    CharacterTraitPolicy
  end
end
