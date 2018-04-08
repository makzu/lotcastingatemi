# frozen_string_literal: true

# Broadcasts destroy events for characters, etc
class DestroyBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity, parent_type = nil, parent_id = nil)
    ids.each do |id|
      broadcast_destroy id, entity, parent_type, parent_id
    end
  end
end
