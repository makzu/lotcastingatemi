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

    def self.from_charm!(charm)
      return charm if charm.type == 'Charms::AbilityCharm'

      new_charm = charm.becomes(Charms::AbilityCharm)
      new_charm.type = 'Charms::AbilityCharm'
      new_charm.ability = ''
      new_charm.min_ability = 1 if new_charm.min_ability.blank?
      new_charm.save!
      new_charm
    end

    private

    def ability_blank?
      ability.blank?
    end
  end
end
