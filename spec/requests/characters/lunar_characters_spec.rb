# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'LunarCharacters' do
  it_behaves_like 'character', :lunar_character
end
