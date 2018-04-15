# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'CustomAbilityCharacters', type: :request do
  it_behaves_like 'character', :custom_ability_character
end
