# frozen_string_literal: true

source 'https://rubygems.org'

# Rails 5.1+ for Webpacker
gem 'rails', '~> 6.1'

# Vite_Rails for more modern frontend bundling
gem 'vite_rails', '~> 3.0'

# Use postgres as the database for Active Record
gem 'pg', '~> 1.4'
# Use Puma as the app server
gem 'puma', '~> 6.0'

# For JSON responses
gem 'active_model_serializers', '~> 0.10'

# Pagination
gem 'pagy', '~> 6.0'

# For duplicating QCs and Battlegroups
gem 'deep_cloneable', '~> 3.0'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1'

gem 'bootsnap', '~> 1.16', require: false
gem 'uglifier', '~> 4.2'

# Authentication/Authorization
gem 'knock', '~> 2.2', git: 'https://github.com/makzu/knock'
gem 'pundit', '~> 2.3'

gem 'omniauth', '~> 2.1'
gem 'omniauth-google-oauth2', '~> 1.1'
gem 'omniauth-rails_csrf_protection', '~> 1.0'

# Validate json fields like craft ratings, qc pools, etc
# Stick with 1.x for now because we had issues with 2.x
# TODO: fix these issues?
gem 'activerecord_json_validator', '~>1.3'
gem 'email_validator', '~> 2.2'

# For Heroku:
group :production do
  gem 'rails_serve_static_assets', '~> 0.0.5'
end

# For Heroku Ruby metrics
gem 'barnes', '~>0.0.9'
gem 'scout_apm', '~> 5.3'

# logging
gem 'colorize', '~> 0.8'
gem 'lograge', '~> 0.12'

# Force ruby 3.2 compatibile version
# gem 'nokogiri', '~> 1.14'

group :development, :test, :cypress do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 11.1', platform: :mri
  gem 'cypress-on-rails', '~> 1.13'
  gem 'database_cleaner', '~> 2.0'
  gem 'factory_bot_rails', '~> 6.2'
  gem 'rspec-rails', '~> 6.0'

  # Linting
  gem 'rubocop', '~> 1.44', require: false
  gem 'rubocop-performance', '~> 1.15', require: false
  gem 'rubocop-rails', '~> 2.17', require: false
  gem 'rubocop-rspec', '~> 2.18', require: false

  # Security Tools
  gem 'brakeman', '~> 5.4'
  gem 'bundler-audit', '~> 0.9'
  gem 'ruby_audit', '~> 2.2'

  # profiling
  gem 'derailed_benchmarks', '~> 2.1'
  gem 'faker', '~> 3.1'
  gem 'stackprof', '~> 0.2'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '~> 3.8'
  gem 'web-console', '~> 4.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rack-cors', '~> 1.1', require: 'rack/cors'
  gem 'rails_real_favicon', '~> 0.1'
  gem 'spring', '~> 4.1'
  gem 'spring-watcher-listen', '~> 2.1'

  # Performance metrics
  gem 'bullet', '~> 7.0'
  # gem 'flamegraph'
  # gem 'meta_request'
  gem 'memory_profiler', '~> 1.0'
  gem 'rack-mini-profiler', '~> 3.0', require: false
  # gem 'scout_apm'
  # gem 'stackprof'
end

group :test do
  gem 'pundit-matchers', '~> 1.4'
  gem 'simplecov', '~> 0.22', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', '~> 1', platforms: %i[mingw mswin x64_mingw jruby]

ruby File.read('./.ruby-version').strip
