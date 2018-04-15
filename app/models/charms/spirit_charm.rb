# frozen_string_literal: true

module Charms
  # Spirit charms, learnable by Eclipses and people with very specific situations
  class SpiritCharm < Charm
    attribute :name, :string, default: 'New Spirit Charm'

    def charm_type
      'Spirit'
    end

    def entity_assoc
      'spirit_charm'
    end
  end
end
