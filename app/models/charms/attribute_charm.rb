# frozen_string_literal: true

module Charms
  # Attribute-based Charms, for Lunars, Alchemicals, etc
  class AttributeCharm < Charm
    include Constants
    attribute :min_ability, :integer, default: 1
    attribute :ability,     :string,  default: ''

    alias_attribute :attr, :ability
    alias_attribute :min_attr, :min_ability

    validates :min_ability, one_thru_five_stat: true

    validates :ability, inclusion: { in: Constants::ATTRIBUTES }, unless: :ability_blank?

    def charm_type
      'Attribute'
    end

    private

    def ability_blank?
      ability.blank?
    end
  end
end
