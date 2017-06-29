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
end
