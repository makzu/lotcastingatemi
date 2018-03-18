# frozen_string_literal: true

require 'rails_helper'
require 'support/shared_examples/character_trait'

RSpec.describe 'Evocations', type: :request do
  it_behaves_like 'character trait', :evocation, 'characters'
end
