# frozen_string_literal: true

namespace :lca do
  desc 'Lint both the frontend and backend'
  task lint: ['lca:lint:frontend', 'lca:lint:backend']

  namespace :lint do
    desc 'Lint backend code with rubocop'
    RuboCop::RakeTask.new(:backend) do |tsk|
      tsk.options = ['-DR']
      tsk.fail_on_error = false
    end

    desc 'Lint frontend code with eslint'
    task :frontend do
      begin
        sh './bin/yarn lint'
      rescue RuntimeError => e
        puts e.message
        exit
      end
    end
  end
end
