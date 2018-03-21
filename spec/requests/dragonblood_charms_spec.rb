# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'DragonbloodCharms', type: :request do
  it_behaves_like 'character trait', :dragonblood_charm, 'characters'
end
