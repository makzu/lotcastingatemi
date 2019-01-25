# frozen_string_literal: true

# By default ActionCable logs several lines of mostly useless info every time a
# player connects. The heroku/router logger already gives info about connections
# to /cable anyway.
ActionCable.server.config.logger = Logger.new(nil) if Rails.env.production?
