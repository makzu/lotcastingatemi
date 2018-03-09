# frozen_string_literal: true

# Represents individual attack pools for QCs.  Battlegroups take these numbers
# and add their own bonuses.
class QcAttack < ApplicationRecord
  include Broadcastable
  belongs_to :qc_attackable, polymorphic: true
  alias_attribute :character, :qc_attackable

  delegate :player,      to: :qc_attackable
  delegate :chronicle,   to: :qc_attackable
  delegate :storyteller, to: :qc_attackable
  delegate :hidden,      to: :qc_attackable

  validates :pool, :damage, :overwhelming, numericality: { greater_than: 0 }

  def entity_type
    'qc_attack'
  end

  def self.policy_class
    CharacterTraitPolicy
  end
end
