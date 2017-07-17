# frozen_string_literal: true

# Represents individual attack pools for QCs.  Battlegroups take these numbers
# and add their own bonuses.
class QcAttack < ApplicationRecord
  belongs_to :qc_attackable, polymorphic: true
  delegate :player,    to: :qc_attackable
  delegate :chronicle, to: :qc_attackable

  validates :pool, :damage, :overwhelming, numericality: { greater_than: 0 }

  def character
    qc_attackable
  end

  def self.policy_class
    CharacterTraitPolicy
  end
end
