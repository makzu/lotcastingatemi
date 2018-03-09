# frozen_string_literal: true

#
class ChronicleChannel < ApplicationCable::Channel
  def subscribed
    stream_from "entity-update-#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
