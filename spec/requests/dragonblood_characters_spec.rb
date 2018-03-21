# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'DragonbloodCharacters', type: :request do
  it_behaves_like 'character', :dragonblood_character
end
