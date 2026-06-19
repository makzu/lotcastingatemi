# frozen_string_literal: true

module Charms
  # Charms for Custom Essence Exalts, like some Exigents
  class EssenceCharm < Charm
    before_create :set_loadout_to_character_active_loadout

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
