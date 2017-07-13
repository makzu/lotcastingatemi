# frozen_string_literal: true

# Common validations for entities with mote pools
module MotePool
  extend ActiveSupport::Concern

  included do
    validates :motes_personal_current, :motes_personal_total,
              :motes_peripheral_current, :motes_peripheral_total,
              numericality: { greater_than_or_equal_to: 0 }

    validate :cant_have_more_current_motes_than_total

    private

    def cant_have_more_current_motes_than_total
      if motes_personal_current > motes_personal_total
        errors.add(:motes_personal_current, 'cannot be more than total')
      end
      if motes_peripheral_current > motes_peripheral_total # rubocop:disable Style/GuardClause
        errors.add(:motes_peripheral_current, 'cannot be more than total')
      end
    end
  end
end
