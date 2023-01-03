# frozen_string_literal: true

source 'https://rubygems.org'

# Rails 5.1+ for Webpacker
gem 'rails', '~> 6.1.0'
# Webpacker allows React/Redux and friends to thrive:
gem 'webpacker', '~> 5.4.0'

# Use postgres as the database for Active Record
gem 'pg', '~> 1.4'
# Use Puma as the app server
gem 'puma', '~> 6.0.0'

# For JSON responses
gem 'active_model_serializers', '~> 0.10.9'

# For duplicating QCs and Battlegroups
gem 'deep_cloneable', '~> 3.0'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'

gem 'bootsnap', '~> 1.15.0', require: false

# Authentication/Authorization
gem 'knock', '~> 2.2.0', git: 'https://github.com/makzu/knock'
gem 'pundit', '~> 2.3.0'

gem 'omniauth', '~> 2.1.0'
gem 'omniauth-google-oauth2', '~> 1.1.0'
gem 'omniauth-rails_csrf_protection', '~> 1.0'

# Validate json fields like craft ratings, qc pools, etc
# Stick with 1.x for now because we had issues with 2.x
# TODO: fix these issues?
gem 'activerecord_json_validator', '~>1.3.0'
gem 'email_validator', '~> 2.2.0'

# Profiling
# gem 'derailed'
# gem 'faker'

# For Heroku:
group :production do
  gem 'rails_serve_static_assets', '~> 0.0.5'
end

# For Heroku Ruby metrics
gem 'barnes', '~>0.0.9'

# logging
gem 'colorize', '~> 0.8.0'
gem 'lograge', '~> 0.12.0'

group :development, :test, :cypress do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'action-cable-testing', '~> 0.6.0'
  gem 'byebug', platform: :mri
  gem 'cypress-on-rails', '~> 1.13.0'
  gem 'database_cleaner', '~> 2.0.0'
  gem 'factory_bot_rails', '~> 6.2.0'
  gem 'rspec-rails', '~> 6.0.1'
  gem 'rubocop', '~> 1.42.0', require: false
  gem 'rubocop-rails', '~> 2.17.0', require: false
  gem 'rubocop-rspec', '~> 2.16.0', require: false
end

group :development do
  gem 'foreman'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '~> 3.7.0'
  gem 'web-console'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rack-cors', require: 'rack/cors'
  gem 'rails_real_favicon'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.1.0'

  # Performance metrics
  # gem 'flamegraph'
  # gem 'meta_request'
  gem 'memory_profiler'
  gem 'rack-mini-profiler', require: false
  # gem 'scout_apm'
  # gem 'stackprof'
end

group :test do
  gem 'pundit-matchers', '~> 1.4'
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

ruby '2.7.7'
