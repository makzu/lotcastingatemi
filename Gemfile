# frozen_string_literal: true

source 'https://rubygems.org'

# Rails 5.1 for Webpacker
gem 'rails', '~> 5.1.2'
# Webpacker allows React/Redux and friends to thrive:
gem 'webpacker', '~> 2.0'

# Use postgres as the database for Active Record
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 3.7'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Used for grid layout and that's pretty much it
gem 'bourbon'
gem 'neat'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'

gem 'active_model_serializers', '~> 0.10.6'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.11'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Authentication/Authorization
gem 'knock'
gem 'pundit'

# Validate json fields like craft ratings, qc pools, etc
gem 'activerecord_json_validator'
gem 'email_validator'

# For Heroku:
group :production do
  gem 'rails_serve_static_assets'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'capybara', '~> 2.14.0'
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'rubocop', require: false
  gem 'selenium-webdriver'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '~> 3.1.0'
  gem 'web-console'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rack-cors', require: 'rack/cors'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'pundit-matchers', '~> 1.3.0'
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

ruby '2.4.2'
