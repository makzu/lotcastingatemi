# frozen_string_literal: true

module Charms
  # Ability-based Charms for Solars, Dragon-Blooded, etc.
  # Does not include Martial Arts.
  class AbilityCharm < Charm
    include Constants

    attribute :ability,     :string,  default: ''
    attribute :min_ability, :integer, default: 1

    validates :ability, inclusion: { in: Constants::ABILITIES }, unless: :ability_blank?
    validates :min_ability, one_thru_five_stat: true

    def charm_type
      'Ability'
    end

    private

    def ability_blank?
      ability.blank?
    end
  end
end
