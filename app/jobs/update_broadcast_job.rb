# frozen_string_literal: true

# Broadcasts updates to QCs, Characters, Charms, etc
class UpdateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity, changes)
    ids.each do |id|
      broadcast_update id, entity, changes.transform_values(&:last)
    end
  end
end
