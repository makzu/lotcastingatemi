# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module SortableBySt
  extend ActiveSupport::Concern
  included do
    before_validation :set_default_chronicle_sort_order

    def set_default_chronicle_sort_order
      return unless chronicle_sort_order.blank? || chronicle_sort_order.zero?
      # Fuzz the timestamp a bit in case a bunch of whatevers are created at once
      val = created_at.blank? ? Time.now.to_i : created_at.to_i
      self.chronicle_sort_order = val + (val % 8) + rand(5)
    end
  end
end
