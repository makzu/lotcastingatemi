# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'CustomAttributeCharacters' do
  it_behaves_like 'character', :custom_attribute_character
end
