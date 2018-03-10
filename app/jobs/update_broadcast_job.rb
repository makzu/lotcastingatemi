# frozen_string_literal: true

# Broadcasts updates to QCs, Characters, Charms, etc
class UpdateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity, changes)
    ids.each do |id|
      ActionCable.server.broadcast(
        "entity-update-#{id}",
        event: 'update',
        type: entity.entity_type + 's',
        id: entity.id,
        changes: changes.transform_values(&:last)
      )
    end
  end
end
