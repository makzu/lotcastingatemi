# frozen_string_literal: true

# Broadcasts updates to QCs, Characters, Charms, etc
class UpdateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, entity, changes)
    ids.each do |id|
      if [entity.player.id, entity&.storyteller&.id].include? id
        broadcast_update id, entity, changes
      else
        # Remove hidden intimacies from broadcasted changes
        broadcast_update id, entity.try(:without_secrets) || entity, changes
      end
    end
  end
end
