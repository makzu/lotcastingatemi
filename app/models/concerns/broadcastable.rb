# frozen_string_literal: true

# Common methods for models attached to QCs (merits, Charms, etc)
module Broadcastable
  extend ActiveSupport::Concern
  included do
    after_create :broadcast_parent
    after_destroy :broadcast_parent
    after_save :broadcast_update

    # TODO: Factor this out into a job
    def broadcast_update
      # Do not broadcast if the parent character is being deleted
      # This is to prevent Charms, Merits, etc from sending their own individual
      # destroy messages when a whole character is being deleted
      return if trait? && character.destroyed?

      all_ids.each do |id|
        ActionCable.server.broadcast(
          "entity-update-#{id}",
          type: entity_type,
          entity: Api::V1::BaseController.renderer.render(json: self)
        )
      end
    end

    def broadcast_parent
      return if trait? && character.destroyed?

      parent = which_parent

      all_ids.each do |id|
        ActionCable.server.broadcast(
          "entity-update-#{id}",
          type: parent.entity_type,
          entity: Api::V1::BaseController.renderer.render(json: parent)
        )
      end
    end

    private

    def all_ids
      return [player.id] if chronicle.blank?
      return ([player.id] + [chronicle.st_id]).uniq if hidden

      ([player.id] + [chronicle.st_id] + chronicle.players.pluck(:id)).uniq
    end

    def which_parent
      return character if trait?
      return chronicle if chronicle.present?
      player
    end

    def trait?
      !is_a?(Character) && !is_a?(Qc) && !is_a?(Battlegroup)
    end

  end
end
