# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LotCastingAtemi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.action_dispatch.rescue_responses['Pundit::NotAuthorizedError'] = :forbidden
    config.annotations.register_extensions('jsx', 'ts', 'tsx') { |annotation| %r{//\s*(#{annotation}):?\s*(.*?)$} }
    config.annotations.register_extensions('scss', 'sass') { |annotation| %r{//\s*(#{annotation}):?\s*(.*?)$} }

    # Compress API responses
    config.middleware.insert_after ActionDispatch::Static, Rack::Deflater
  end
end
