# frozen_string_literal: true

# Broadcasts whenever a Chronicle's list of characters/etc changes
class ChronicleCharactersBroadcastJob < ApplicationJob
  queue_as :default

  def perform(ids, chronicle, type, thing)
    ids.each do |id|
      broadcast_update id, chronicle, "#{type}s" => chronicle.send("#{type}_ids")
      broadcast_update id, thing, chronicle_id: nil if thing.chronicle_id.blank?
    end
  end
end
