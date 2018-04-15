# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Charms::EssenceCharms', type: :request do
  it_behaves_like 'character trait', :charms_essence_charm, 'characters'
end
