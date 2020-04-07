# frozen_string_literal: true

# Broadcasts whenever a Chronicle's list of characters/etc changes
class ChronicleCharactersBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, chronicle, type, thing)
    ids.each do |id|
      if thing.chronicle_id.present?
        broadcast_create id, thing, json(thing), 'chronicle', thing.chronicle_id
      end
      broadcast_update id, chronicle, "#{type}s" => chronicle.send("#{type}_ids")
      broadcast_update id, thing, chronicle_id: nil if thing.chronicle_id.blank?
    end
  end

  def json(entity)
    Api::V1::BaseController.render(json: entity)
  end
end
