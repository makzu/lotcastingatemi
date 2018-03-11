# frozen_string_literal: true

# Superclass for Charms
class Charm < ApplicationRecord
  include Broadcastable
  include CharacterTrait
  include EssenceCharm

  def entity_type
    'charm'
  end

  def entity_assoc
    'charm'
  end
end
