# frozen_string_literal: true

require 'rubocop/rake_task'

namespace :lca do
  desc 'Run full Rspec and Jest test suites'
  task test: [:spec, 'lca:frontend:test']

  namespace :test do
    desc 'Run Rspec as normal and Jest with optional coverage report'
    task cov: [:spec, 'lca:frontend:testcov']
  end

  desc 'Lint both the frontend and backend'
  task lint: ['lca:lint:rubocop', 'lca:frontend:lint']

  namespace :lint do
    desc 'Lint code with rubocop'
    RuboCop::RakeTask.new(:rubocop) do |tsk|
      tsk.options = ['-DR']
      tsk.fail_on_error = false
    end
  end

  desc 'Run full test suite and lint suite'
  task everything: ['lca:test', 'lca:lint']
end
