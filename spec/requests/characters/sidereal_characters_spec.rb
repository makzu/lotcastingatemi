# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'SiderealCharacters' do
  it_behaves_like 'character', :sidereal_character
end
