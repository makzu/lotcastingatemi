# frozen_string_literal: true

source 'https://rubygems.org'

gem 'rails', '~> 7.2'

# Vite_Rails for more modern frontend bundling
gem 'vite_rails', '~> 3.0'

# Use postgres as the database for Active Record
gem 'pg', '~> 1.5'
# Use Puma as the app server
gem 'puma', '~> 6.4'

# For JSON responses
gem 'active_model_serializers', '~> 0.10'

# Pagination
gem 'pagy', '~> 6.0'

# For duplicating QCs and Battlegroups
gem 'deep_cloneable', '~> 3.2'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1'

gem 'bootsnap', '~> 1.18', require: false

# Authentication/Authorization
gem 'knock', '~> 2.2', git: 'https://github.com/makzu/knock'
gem 'pundit', '~> 2.3'

gem 'omniauth', '~> 2.1'
gem 'omniauth-google-oauth2', '~> 1.1'
gem 'omniauth-rails_csrf_protection', '~> 1.0'

# Sorting
gem 'ranked-model', '~> 0.4.11'

# Timeout protection
# gem 'rack-timeout', '~> 0.6'

# Validate json fields like craft ratings, qc pools, etc
gem 'activerecord_json_validator', '~> 2.0'
gem 'email_validator', '~> 2.2'

# Automatic Eager Loading
gem 'goldiloader', '~> 5.2'

# For Heroku:
group :production do
  gem 'rails_serve_static_assets', '~> 0.0.5'
end

# For Heroku Ruby metrics
gem 'barnes', '~>0.0.9'
gem 'scout_apm', '~> 5.4'

# logging
gem 'colorize', '~> 1.1'
gem 'lograge', '~> 0.12'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', '~> 12.0', platform: :mri
  gem 'cypress-on-rails', '~> 1.18'
  gem 'database_cleaner-active_record', '~> 2.2'
  gem 'factory_bot_rails', '~> 6.4'
  gem 'rspec-rails', '~> 8.0'

  # Linting
  gem 'rubocop', '~> 1.50', require: false
  gem 'rubocop-performance', '~> 1.26', require: false
  gem 'rubocop-rails', '~> 2.33', require: false
  gem 'rubocop-rspec', '~> 3.7', require: false

  # Security Tools
  gem 'brakeman', '~> 7.1'
  gem 'bundler-audit', '~> 0.9'

  # profiling
  gem 'derailed_benchmarks', '~> 2.1'
  gem 'faker', '~> 3.2'
  gem 'stackprof', '~> 0.2'

  # Code Quality
  gem 'reek', '~> 6.5', require: false
end

group :development do
  # Better developer experience in vscode
  gem 'ruby-lsp-rails', '~> 0.4', require: false
  gem 'ruby-lsp-rspec', '~> 0.1', require: false

  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '~> 3.8'
  gem 'web-console', '~> 4.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rack-cors', '~> 2.0', require: 'rack/cors'
  gem 'rails_real_favicon', '~> 0.1'
  gem 'spring', '~> 4.4'
  gem 'spring-watcher-listen', '~> 2.1'

  # Performance metrics
  gem 'bullet', '~> 7.1'
  # gem 'flamegraph'
  # gem 'meta_request'
  gem 'memory_profiler', '~> 1.1'
  gem 'rack-mini-profiler', '~> 3.3', require: false
  # gem 'stackprof'
end

group :test do
  gem 'pundit-matchers', '~> 4.0'
  gem 'simplecov', '~> 0.22', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', '~> 1', platforms: %i[windows jruby]

ruby File.read('./.ruby-version').strip
