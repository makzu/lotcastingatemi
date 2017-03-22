## Common validations and methods for entities with willpower ratings
module HealthLevels
  extend ActiveSupport::Concern

  included do
    # TODO check to ensure these are valid ranges for Willpower
    validates :willpower_temporary,
      numericality: { less_than_or_equal_to: 10, greater_than_or_equal_to: 0 }
    validates :willpower_permanent,
      numericality: { less_than_or_equal_to: 10, greater_than: 0             }
  end
end
