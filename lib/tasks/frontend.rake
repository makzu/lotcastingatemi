# frozen_string_literal: true

namespace :lca do
  namespace :frontend do
    desc 'Run the Jest test suite on the frontend'
    task test: :environment do
      send_yarn_command('test')
    end

    desc 'Run the Jest test suite, re-rendering all component snapshots'
    task testu: :environment do
      send_yarn_command('test -- -u')
    end

    desc 'Run the Jest test suite with (time-consuming) coverage report'
    task testcov: :environment do
      send_yarn_command('testcov')
    end

    desc 'Type-Check code with Flow'
    task flow: :environment do
      send_yarn_command('flow')
    end

    desc 'Analyze the frontend bundle size'
    task analyze: :environment do
      send_yarn_command('webpack:analyze')
    end
  end
end

def send_yarn_command(cmd)
  sh "./bin/yarn #{cmd}"
rescue RuntimeError => e
  puts e.message
  exit
end
