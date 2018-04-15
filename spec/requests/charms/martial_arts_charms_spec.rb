# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Charms::MartialArtsCharms', type: :request do
  it_behaves_like 'character trait', :charms_martial_arts_charm, 'characters'
end
