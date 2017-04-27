# frozen_string_literal: true

# Common validations for entities with intimacies
module Intimacies
  extend ActiveSupport::Concern

  included do
    validates :principles, json: { schema: Schemas::INTIMACY }
    validates :ties,       json: { schema: Schemas::INTIMACY }
  end
end
