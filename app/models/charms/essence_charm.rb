# frozen_string_literal: true

module Charms
  # Charms for Custom Essence Exalts, like some Exigents I'm sure
  class EssenceCharm < Charm
    def charm_type
      'Essence'
    end

    def self.from_charm!(charm)
      return charm if charm.type == 'Charms::EssenceCharm'

      new_charm = charm.becomes(Charms::EssenceCharm)
      new_charm.type = 'Charms::EssenceCharm'
      new_charm.ability = ''
      new_charm.min_ability = nil
      new_charm.save!
      new_charm
    end
  end
end
