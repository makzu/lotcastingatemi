# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LotCastingAtemi
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.action_dispatch.rescue_responses['Pundit::NotAuthorizedError'] = :forbidden
    config.annotations.register_extensions('jsx') { |annotation| %r{//\s*(#{annotation}):?\s*(.*?)$} }
    config.annotations.register_extensions('scss', 'sass') { |annotation| %r{//\s*(#{annotation}):?\s*(.*?)$} }
  end
end
