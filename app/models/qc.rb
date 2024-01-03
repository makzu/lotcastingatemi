# frozen_string_literal: true

# Traits for QCs.
class Qc < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  include HealthLevels
  include Intimacies
  include MotePool
  include Willpower
  include RankedModel

  ranks :sorting, with_same: :player_id
  ranks :chronicle_sorting, with_same: :chronicle_id

  with_options inverse_of: :qc, dependent: :destroy do
    has_many :qc_charms, -> { order(:sorting) }
    has_many :qc_merits, -> { order(:sorting) }
  end

  with_options dependent: :destroy do
    has_many :qc_attacks, -> { order(:sorting) }, as: :qc_attackable, inverse_of: :qc_attackable
    has_many :spells,     -> { order(:sorting) }, as: :sorcerer,      inverse_of: :sorcerer
    has_many :poisons,    -> { order(:sorting) }, as: :poisonable,    inverse_of: :poisonable
    # has_many :combat_actors, -> { order(:sorting) }, as: :actor, inverse_of: :actor
  end

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

  validates :actions,   json: { schema: Schemas::QC_ACTION }
  validates :resources, json: { schema: Schemas::RESOURCE }

  def entity_type
    'qc'
  end
  alias entity_assoc entity_type
  alias type entity_type
end
