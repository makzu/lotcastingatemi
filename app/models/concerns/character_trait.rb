# frozen_string_literal: true

# Common methods for models attached to Characters (merits, Charms, etc)
module CharacterTrait
  extend ActiveSupport::Concern
  included do
    belongs_to :character, foreign_key: :character_id # rubocop:disable Rails/InverseOf

    delegate :player,      to: :character
    delegate :chronicle,   to: :character
    delegate :storyteller, to: :character
    delegate :hidden,      to: :character
  end

  # Ensure the correct Pundit policy is used (to prevent needing CharmPolicy, MeritPolicy, et al)
  module ClassMethods
    def policy_class
      CharacterTraitPolicy
    end
  end
end
