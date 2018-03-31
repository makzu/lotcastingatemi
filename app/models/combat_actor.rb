# frozen_string_literal: true

# Dummy class holding only damage, so that an ST can have multiple copies of a
# given QC or Battlegroup at a time
class CombatActor < ApplicationRecord
  include Broadcastable
  include BelongsToPlayer
  belongs_to :actor, polymorphic: true

  validates :onslaught, numericality: { greater_than_or_equal_to: 0 }
  validates :damage_bashing,
            :damage_lethal,
            :damage_aggravated,
            :motes_personal_current,
            :motes_peripheral_current,
            :willpower_temporary,
            numericality: { greater_than_or_equal_to: 0 }
  validates :anima_level, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }

  def entity_type
    'combat_actor'
  end

  def entity_assoc
    entity_type
  end

  def type
    entity_type
  end

  def hidden
    false
  end
end
