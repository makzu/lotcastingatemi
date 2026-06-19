# frozen_string_literal: true

# Superclass for Charms
# DEPRECATED ATTRIBUTES:
# sort_order, in favor of sorting via ranked_model
class Charm < ApplicationRecord
  include Broadcastable
  include CharacterTrait
  include EssenceCharm
  include RankedModel

  ranks :sorting, with_same: :character_id

  def charm_type
    'Charm'
  end

  def entity_type
    'charm'
  end
  alias entity_assoc entity_type

  def set_loadout_to_character_active_loadout
    return if character.active_loadout.blank?

    self.loadouts = [character.active_loadout]
  end

  def self.from_charm!
    raise NotImplementedError
  end
end
