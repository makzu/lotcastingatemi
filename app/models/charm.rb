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

  before_destroy :destroy_charm_slots

  def charm_type
    'Charm'
  end

  def entity_type
    'charm'
  end
  alias entity_assoc entity_type

  def self.from_charm!
    raise NotImplementedError
  end

  private

  def destroy_charm_slots
    CharmSlot.find_by(charm_id: id)&.destroy
  end
end
