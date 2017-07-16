# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module QcTrait
  extend ActiveSupport::Concern
  included do
    belongs_to :qc
    delegate :player,    to: :qc
    delegate :chronicle, to: :qc

    def character
      qc
    end
  end

  # Ensure the correct Pundit policy is used (to prevent needing QcCharmPolicy, QcMeritPolicy, et al)
  module ClassMethods
    def policy_class
      CharacterTraitPolicy
    end
  end
end
