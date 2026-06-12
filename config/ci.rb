# frozen_string_literal: true

# Run using bin/ci

CI.run do
  step 'Setup', 'bin/setup --skip-server'

  step 'Style: Ruby', 'bin/rubocop'
  # TODO: Add eslint or biome linting once it can run cleanly

  step 'Security: Gem audit', 'bin/bundler-audit'
  # TODO: re-enable this once it can run cleanly
  # step 'Security: NPM Package audit', 'bin/yarn npm audit'
  step 'Security: Brakeman code analysis', 'bin/brakeman --quiet --no-pager --exit-on-warn --exit-on-error'

  step 'Tests: Rails', 'bin/rspec'
  step 'Tests: Seeds', 'env RAILS_ENV=test bin/rails db:seed:replant'
  # TODO: Add vitest or other frontend testing
  # TODO: Add playwright or other e2e testing

  # Optional: set a green GitHub commit status to unblock PR merge.
  # Requires the `gh` CLI and `gh extension install basecamp/gh-signoff`.
  # if success?
  #   step "Signoff: All systems go. Ready for merge and deploy.", "gh signoff"
  # else
  #   failure "Signoff: CI failed. Do not merge or deploy.", "Fix the issues and try again."
  # end
end
