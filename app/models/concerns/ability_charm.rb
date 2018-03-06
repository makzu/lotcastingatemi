# frozen_string_literal: true

# Common validations for Ability Charms (non Martial Arts)
module AbilityCharm
  extend ActiveSupport::Concern
  include Constants

  included do
    validates :ability, inclusion: { in: Constants::ABILITIES }, unless: :ability_blank?
    validates :min_ability, one_thru_five_stat: true

    attribute :min_ability, :integer, default: 1

    private

    def ability_blank?
      ability.blank?
    end
  end
end
