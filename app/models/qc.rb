# frozen_string_literal: true

# Traits for QCs.  A QC can serve as the base for any number of battlegroups.
class Qc < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include HealthLevels
  include Intimacies
  include MotePool
  include Sortable
  include SortableBySt
  include Willpower

  has_many :qc_attacks,   dependent: :destroy, as: :qc_attackable
  has_many :qc_charms,    dependent: :destroy
  has_many :qc_merits,    dependent: :destroy
  has_many :combat_actors, dependent: :destroy, as: :actor

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, numericality: {
    greater_than_or_equal_to: 1, less_than_or_equal_to: 10
  }

  validates :grapple, :grapple_control,
            :hardness,
            :onslaught,
            numericality: { greater_than_or_equal_to: 0 }

  validates :resolve, :guile, :appearance,
            :join_battle, :evasion, :parry, :soak,
            :movement, :senses,
            numericality: { greater_than: 0 }

  validates :actions, json: { schema: Schemas::QC_ACTION }

  def entity_type
    'qc'
  end

  def type
    entity_type
  end

  def entity_assoc
    entity_type
  end
end
