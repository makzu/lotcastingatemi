# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Charms::Evocations', type: :request do
  it_behaves_like 'character trait', :charms_evocation, 'characters'
end
