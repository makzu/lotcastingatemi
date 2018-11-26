# frozen_string_literal: true

# Superclass for Charms
class Charm < ApplicationRecord
  include Broadcastable
  include CharacterTrait
  include EssenceCharm

  def charm_type
    'Charm'
  end

  def entity_type
    'charm'
  end
  alias_attribute :entity_assoc, :entity_type

  def self.from_charm!
    raise NotImplementedError
  end
end
