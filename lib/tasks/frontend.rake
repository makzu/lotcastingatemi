# frozen_string_literal: true

namespace :lca do
  namespace :frontend do
    desc 'Run the Jest test suite on the frontend'
    task :test do
      begin
        sh './bin/yarn test'
      rescue RuntimeError => e
        puts e.message
        exit
      end
    end

    desc 'Run the Jest test suite, re-rendering all component snapshots'
    task :testu do
      begin
        sh './bin/yarn test -- -u'
      rescue RuntimeError => e
        puts e.message
        exit
      end
    end

    desc 'Run the Jest test suite with optional (time-consuming) coverage report'
    task :testcov do
      sh './bin/yarn testcov'
    end

    desc 'Lint the frontend using eslint'
    task :lint do
      sh './bin/yarn lint'
    end
  end
end
