# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module BelongsToPlayer
  extend ActiveSupport::Concern
  included do
    belongs_to :player

    # TODO: validate that if a character is in a chronicle, the player must be too
    belongs_to :chronicle, optional: true
    scope :in_chronicle, ->(chronicle) { where(chronicle_id: chronicle.id) }
  end
end
