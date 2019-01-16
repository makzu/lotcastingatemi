# frozen_string_literal: true

source 'https://rubygems.org'

# Rails 5.1+ for Webpacker
gem 'rails', '~> 5.2.2'
# Webpacker allows React/Redux and friends to thrive:
gem 'webpacker', '>= 4.0.0.rc.2'

# Use postgres as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 3.7'

# Use SCSS for stylesheets
# gem 'sass-rails', '~> 5.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'

# For JSON responses
gem 'active_model_serializers', '~> 0.10.8'

# For duplicating QCs and Battlegroups
gem 'deep_cloneable', '~> 2.3'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

gem 'bootsnap', '~> 1.3.0', require: false

# Authentication/Authorization
gem 'knock'
gem 'pundit'

gem 'omniauth-google-oauth2'

# Validate json fields like craft ratings, qc pools, etc
gem 'activerecord_json_validator'
gem 'email_validator'

# Profiling
# gem 'derailed'
# gem 'faker'

# For Heroku:
group :production do
  gem 'rails_serve_static_assets'
end

# For Heroku Ruby metrics
gem 'barnes'

# logging
gem 'colorize'
gem 'lograge'

group :development, :test, :cypress do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'action-cable-testing'
  gem 'byebug', platform: :mri
  gem 'cypress-on-rails'
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'rubocop', '~> 0.60', require: false
  gem 'rubocop-rspec', '~> 1.30', require: false
end

group :development do
  gem 'foreman'
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '~> 3.1.0'
  gem 'web-console'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rack-cors', require: 'rack/cors'
  gem 'rails_real_favicon'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Performance metrics
  # gem 'flamegraph'
  # gem 'meta_request'
  gem 'memory_profiler'
  gem 'rack-mini-profiler'
  # gem 'scout_apm'
  # gem 'stackprof'
end

group :test do
  gem 'pundit-matchers', '~> 1.4'
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

ruby '2.6.0'
