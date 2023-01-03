# frozen_string_literal: true

# Common validations for all Charms and QC Charms
module EssenceCharm
  extend ActiveSupport::Concern

  CHARM_TIMINGS = %w[ simple supplemental reflexive permanent supplemental/reflexive ].freeze

  included do
    before_validation :trim_keywords

    # Essence above 5 is explicitly mentioned in the book
    validates :min_essence, one_thru_ten_stat: true

    validates :timing, inclusion: { in: CHARM_TIMINGS }

    def trim_keywords
      return unless will_save_change_to_attribute? :keywords

      self.keywords = keywords.compact_blank.collect(&:strip).collect(&:downcase).uniq
    end
  end
end
