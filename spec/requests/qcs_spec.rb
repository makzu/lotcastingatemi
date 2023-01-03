# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'
require 'support/auth_token'

RSpec.describe 'Qcs' do
  it_behaves_like 'character', :qc
end
