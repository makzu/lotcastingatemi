# frozen_string_literal: true

# Superclass for Charms
class Charm < ApplicationRecord
  include CharacterTrait
  include EssenceCharm
end
