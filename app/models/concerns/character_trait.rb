# frozen_string_literal: true

# Common methods for models attached to Characters (merits, Charms, etc)
module CharacterTrait
  extend ActiveSupport::Concern
  included do
    belongs_to :character, foreign_key: :character_id

    delegate :player,    to: :character
    delegate :chronicle, to: :character
  end
end