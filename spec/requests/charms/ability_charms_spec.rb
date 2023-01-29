# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'
require 'requests/shared_examples/charm'

RSpec.describe 'Charms::AbilityCharms' do
  it_behaves_like 'character trait', :charms_ability_charm, 'characters'
  it_behaves_like 'charm', :charms_ability_charm, 'characters'
end
