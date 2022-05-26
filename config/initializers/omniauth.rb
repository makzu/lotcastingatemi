# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :google_oauth2, Rails.application.credentials.google_client_id, Rails.application.credentials.google_secret, verify_iss: false if Rails.env.production?
end
