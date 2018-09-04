# frozen_string_literal: true

## Common validations and methods for entities with health levels and damage
module HealthLevels
  extend ActiveSupport::Concern

  included do
    validates :health_level_0s,
              :health_level_1s,
              :health_level_2s,
              :health_level_4s,
              :health_level_incap,
              :damage_bashing,
              :damage_lethal,
              :damage_aggravated,
              numericality: { greater_than_or_equal_to: 0 }

    def total_health_levels
      health_level_0s +
        health_level_1s +
        health_level_2s +
        health_level_4s +
        health_level_incap
    end
  end
end
