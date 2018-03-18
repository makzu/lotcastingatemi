# frozen_string_literal: true

# Main channel for broadcasting entity updates
class ChronicleChannel < ApplicationCable::Channel
  def subscribed
    stream_from "entity-update-#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
