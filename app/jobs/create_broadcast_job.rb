# frozen_string_literal: true

# Broadcasts newly-created Characters, QCs, etc
class CreateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity, parent)
    ids.each do |id|
      broadcast_create id, entity, json(entity), parent.entity_type, parent.id
    end
  end

  def json(entity)
    Api::V1::BaseController.render(json: entity)
  end
end
