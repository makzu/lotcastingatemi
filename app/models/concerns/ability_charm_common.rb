# frozen_string_literal: true

# Common validations for Ability Charms (non Martial Arts)
module AbilityCharmCommon
  extend ActiveSupport::Concern
  include Constants

  included do
    attribute :ability,     :string,  default: ''
    attribute :min_ability, :integer, default: 1

    validates :ability, inclusion: { in: Constants::ABILITIES }, unless: :ability_blank?
    validates :min_ability, one_thru_five_stat: true

    private

    def ability_blank?
      ability.blank?
    end
  end
end
