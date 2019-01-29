# frozen_string_literal: true

# base actioncable broadcast methods for jobs
class ApplicationJob < ActiveJob::Base
  def broadcast_create(id, entity, json, parent_type, parent_id)
    ActionCable.server.broadcast(
      "entity-update-#{id}",
      event:       'create',
      type:        entity.entity_type,
      assoc:       "#{entity.entity_assoc}s",
      id:          entity.id,
      entity:      json,
      parent_type: "#{parent_type}s",
      parent_id:   parent_id
    )
  end

  def broadcast_update(id, entity, changes)
    ActionCable.server.broadcast(
      "entity-update-#{id}",
      event:   'update',
      type:    entity.entity_type,
      id:      entity.id,
      changes: changes
    )
  end

  def broadcast_destroy(id, entity, parent_type, parent_id, chronicle_id)
    ActionCable.server.broadcast(
      "entity-update-#{id}",
      event:        'destroy',
      type:         entity.entity_type,
      assoc:        "#{entity.entity_assoc}s",
      id:           entity.id,
      parent_type:  "#{parent_type}s",
      parent_id:    parent_id,
      chronicle_id: chronicle_id
    )
  end
end
