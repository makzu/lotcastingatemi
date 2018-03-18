# frozen_string_literal: true

require 'rails_helper'
require 'support/shared_examples/character'

RSpec.describe 'Characters', type: :request do
  it_behaves_like 'character', :character
end
