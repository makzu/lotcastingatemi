# frozen_string_literal: true

require 'colorized_string'

# Shamelessly copied from
# https://dev.to/rhymes/logging-rails-requests-with-structure-and-colors--ing
class LcaColorLog < Lograge::Formatters::KeyValue
  FIELDS_COLORS = {
    method:     :red,
    path:       :red,
    format:     :red,
    controller: :green,
    action:     :green,
    status:     :yellow,
    duration:   :magenta,
    view:       :magenta,
    db:         :magenta,
    ip:         :red,
    player_id:  :green
  }.freeze

  # Shamelessly copied from
  # http://eclecticquill.com/2015/07/26/customizing-lograge-removing-and-adding-fields/
  def call(data)
    data = data.delete_if { |k| %i[controller action format].include? k }
    super
  end

  def format(key, value)
    line = super(key, value)

    color = FIELDS_COLORS[key] || :default
    ColorizedString.new(line).public_send(color)
  end
end

Rails.application.configure do
  config.lograge.enabled = true
  config.lograge.base_controller_class = ['ActionController::API', 'ActionController::Base']
  config.lograge.formatter = LcaColorLog.new

  config.lograge.custom_payload do |controller|
    {
      player_id: controller.try(:current_player).try(:id),
      ip:        controller.request.remote_ip
    }
  end
end
