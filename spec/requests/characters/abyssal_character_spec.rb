# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'AbyssalCharacters' do
  it_behaves_like 'character', :abyssal_character
end
