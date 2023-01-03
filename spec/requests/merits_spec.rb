# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Merits' do
  it_behaves_like 'character trait', :merit, 'characters'
end
