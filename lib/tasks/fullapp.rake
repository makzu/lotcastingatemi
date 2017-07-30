# frozen_string_literal: true

namespace :lca do
  desc 'Run full Rspec and Jest test suites'
  task test: [:spec, 'lca:frontend:test']

  namespace :test do
    desc 'Run Rspec as normal and Jest with optional coverage report'
    task cov: [:spec, 'lca:frontend:testcov']
  end

  desc 'Run full test suite and lint suite'
  task everything: ['lca:test', 'lca:lint']
end
