# frozen_string_literal: true

# Nothing much special here
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  ABILITIES = %w[
    archery athletics awareness brawl bureaucracy craft dodge integrity
    investigation larceny linguistics lore martialarts medicine melee occult
    performance presence resistance ride sail socialize stealth survival
    thrown war
  ].freeze
end
