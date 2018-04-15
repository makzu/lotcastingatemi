# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'CustomEssenceCharacters', type: :request do
  it_behaves_like 'character', :custom_essence_character
end
