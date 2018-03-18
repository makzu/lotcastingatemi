# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'MartialArtsCharms', type: :request do
  it_behaves_like 'character trait', :martial_arts_charm, 'characters'
end
