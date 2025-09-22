# frozen_string_literal: true

module Charms
  # Attribute-based Charms, for Lunars, Alchemicals, etc
  class AttributeCharm < Charm
    include Constants

    attribute :min_ability, :integer, default: 1
    attribute :ability,     :string,  default: ''

    validates :min_ability, one_thru_ten_stat: true

    validates :ability, inclusion: { in: Constants::ATTRIBUTES + %w[universal] }, unless: :ability_blank?

    def charm_type
      'Attribute'
    end

    def self.from_charm!(charm)
      return charm if charm.type == 'Charms::AttributeCharm'

      new_charm = charm.becomes(Charms::AttributeCharm)
      new_charm.type = 'Charms::AttributeCharm'
      new_charm.ability = ''
      new_charm.min_ability = 1 if new_charm.min_ability.blank?
      new_charm.save!
      new_charm
    end

    delegate :blank?, to: :ability, prefix: true
  end
end
