# frozen_string_literal: true

module Charms
  # Evocations.  Rules found starting at p.611 of Core, and in Arms
  class Evocation < Charm
    attribute :name, :string, default: 'New Evocation'
    attribute :artifact_name, :string, default: ''

    def charm_type
      'Evocation'
    end

    def entity_assoc
      'evocation'
    end
  end
end
