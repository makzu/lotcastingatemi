# frozen_string_literal: true

## Common validations and methods for entities with willpower ratings
module Willpower
  extend ActiveSupport::Concern

  included do
    # TODO: check if there are any effects that can raise temporary willpower
    #       above 10
    validates :willpower_temporary,
              numericality: { less_than_or_equal_to: 10, greater_than_or_equal_to: 0 }
    validates :willpower_permanent,
              numericality: { less_than_or_equal_to: 10, greater_than: 0             }
  end
end
