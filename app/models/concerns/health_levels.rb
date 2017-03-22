## Common validations and methods for entities with health levels and damage
module HealthLevels
  extend ActiveSupport::Concern

  included do
    # TODO check if it's possible for a character to have less than the 7
    #      standard health levels
    validates :health_level_0s,     numericality: { greater_than: 0 }
    validates :health_level_1s,     numericality: { greater_than: 0 }
    validates :health_level_2s,     numericality: { greater_than: 0 }
    validates :health_level_4s,     numericality: { greater_than: 0 }
    validates :health_level_incap,  numericality: { greater_than: 0 }

    validates :damage_bashing,      numericality: { greater_than_or_equal_to: 0 }
    validates :damage_lethal,       numericality: { greater_than_or_equal_to: 0 }
    validates :damage_aggravated,   numericality: { greater_than_or_equal_to: 0 }
  end
end
