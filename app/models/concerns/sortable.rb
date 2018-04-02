# frozen_string_literal: true

# Common methods for models with a custom sort order
module Sortable
  extend ActiveSupport::Concern
  included do
    default_scope { order(sort_order: :asc, created_at: :asc) }

    after_initialize :set_default_sort_order

    def set_default_sort_order
      return unless sort_order.blank? || sort_order.zero?
      # Fuzz the timestamp a bit in case a bunch of whatevers are created at once
      val = created_at.blank? ? Time.now.to_i : created_at.to_i
      self.sort_order = val + (val % 8) + rand(5)
    end
  end
end
