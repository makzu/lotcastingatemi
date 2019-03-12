# frozen_string_literal: true

# Traits for QCs.
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
  has_many :spells,  as: :sorcerer, dependent: :destroy
  has_many :poisons, as: :poisonable, dependent: :destroy

  # Essence above 5 is explicitly mentioned in the book
  validates :essence, one_thru_ten_stat: true

  validates :grapple, :grapple_control,
            :hardness,
            :onslaught,
            :resolve, :guile, :appearance,
            :join_battle, :evasion, :parry, :soak,
            :movement, :senses,
            :feats_of_strength, :strength,
            numericality: { greater_than_or_equal_to: 0 }

  validates :actions, json: { schema: Schemas::QC_ACTION }
  validates :resources, json: { schema: Schemas::RESOURCE }

  def entity_type
    'qc'
  end
  alias_attribute :entity_assoc, :entity_type
  alias_attribute :type, :entity_type
end
