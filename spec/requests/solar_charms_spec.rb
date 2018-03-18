# frozen_string_literal: true

require 'rails_helper'
require 'support/shared_examples/character_trait'

RSpec.describe 'SolarCharms', type: :request do
  it_behaves_like 'character trait', :solar_charm, 'characters'
end
