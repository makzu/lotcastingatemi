# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'SolarCharacters' do
  it_behaves_like 'character', :solar_character
end
