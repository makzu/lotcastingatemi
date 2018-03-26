# frozen_string_literal: true

# Common validations for entities with mote pools
module MotePool
  extend ActiveSupport::Concern

  included do
    before_validation :set_max_available_motes

    validates :motes_personal_current, :motes_personal_total,
              :motes_peripheral_current, :motes_peripheral_total,
              numericality: { greater_than_or_equal_to: 0 }

    validates :anima_level, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 3 }
    validates :motes_committed, json: { schema: Schemas::MOTE_COMMITTMENT }

    validate :cant_have_more_current_motes_than_total

    private

    def cant_have_more_current_motes_than_total
      if motes_personal_current > motes_personal_total # rubocop:disable Style/IfUnlessModifier
        errors.add(:motes_personal_current, 'cannot be more than total')
      end
      if motes_peripheral_current > motes_peripheral_total # rubocop:disable Style/GuardClause, Style/IfUnlessModifier
        errors.add(:motes_peripheral_current, 'cannot be more than total')
      end
    end

    def set_max_available_motes
      return unless will_save_change_to_attribute?(:motes_committed) ||
                    will_save_change_to_attribute?(:motes_personal_total) ||
                    will_save_change_to_attribute?(:motes_peripheral_total)

      self.motes_personal_current   = [motes_personal_available,   motes_personal_current].min
      self.motes_peripheral_current = [motes_peripheral_available, motes_peripheral_current].min
    end

    def motes_personal_available
      motes_personal_total - motes_committed.select { |x| x['pool'] == 'personal' }.sum { |x| x['motes'] }
    end

    def motes_peripheral_available
      motes_peripheral_total - motes_committed.select { |x| x['pool'] == 'peripheral' }.sum { |x| x['motes'] }
    end
  end
end
