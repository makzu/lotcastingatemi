# frozen_string_literal: true

#
class UpdateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity)
    # Do something later
    ids.each do |id|
      ActionCable.server.broadcast(
        "entity-update-#{id}",
        type: entity.entity_type,
        entity: Api::V1::BaseController.renderer.render(json: entity)
      )
    end
  end
end
