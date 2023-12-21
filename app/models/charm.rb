# frozen_string_literal: true

# Superclass for Charms
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

  def self.from_charm!
    raise NotImplementedError
  end
end
