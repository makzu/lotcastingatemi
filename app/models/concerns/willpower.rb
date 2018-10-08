# frozen_string_literal: true

# Common validations for entities with willpower ratings.
module Willpower
  extend ActiveSupport::Concern

  included do
    validates :willpower_temporary, numericality: {
      greater_than_or_equal_to: 0
    }

    validates :willpower_permanent, numericality: {
      less_than_or_equal_to: 10, greater_than: 0
    }
  end
end
