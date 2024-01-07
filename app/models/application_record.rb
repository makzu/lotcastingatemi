# frozen_string_literal: true

# Nothing much special here
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  default_scope { order(created_at: :asc) }

  def self.trim_array_attribute(trait)
    trait.compact_blank.collect { |t| t.squish.downcase }.uniq
  end
end
