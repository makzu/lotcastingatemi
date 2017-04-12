# frozen_string_literal: true

require 'rubocop/rake_task'
namespace :lca do
  desc 'Run full Rspec and Jest test suites'
  task test: [:spec, 'lca:frontend:test']

  namespace :test do
    desc 'Run Rspec as normal and Jest with optional coverage report'
    task cov: [:spec, 'lca:frontend:testcov']

    desc 'Lint code with rubocop'
    RuboCop::RakeTask.new(:rubocop) do |tsk|
      tsk.options = ['-DRl']
      tsk.fail_on_error = false
    end

    desc 'Lint both the frontend and backend'
    task lintall: ['lca:test:rubocop', 'lca:frontend:lint']

    desc 'Run full test suite and lint suite'
    task everything: ['lca:test', 'lca:test:lintall']
  end
end
