# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module Broadcastable
  extend ActiveSupport::Concern
  included do
    after_commit :broadcast_update

    # TODO: Factor this out into a job
    def broadcast_update
      # Do not broadcast if the parent character is being deleted
      # This is to prevent Charms, Merits, etc from sending their own individual
      # destroy messages when a whole character is being deleted
      return if !is_a?(Character) && character.destroyed?

      which = which_to_broadcast

      all_ids.each do |id|
        ActionCable.server.broadcast(
          "entity-update-#{id}",
          type: which.entity_type,
          entity: Api::V1::BaseController.renderer.render(json: which)
        )
      end
    end

    private

    def all_ids
      return [player.id] if chronicle.blank?
      return ([player.id] + [chronicle.st_id]).uniq if hidden

      ([player.id] + [chronicle.st_id] + chronicle.players.pluck(:id)).uniq
    end

    def which_to_broadcast
      if new_record? || destroyed?
        if is_a?(Character) && chronicle.present?
          chronicle
        elsif is_a?(Character)
          player
        else
          character
        end
      else
        self
      end
    end

  end
end
