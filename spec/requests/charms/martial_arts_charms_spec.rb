# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'Charms::MartialArtsCharms' do
  it_behaves_like 'charm', :charms_martial_arts_charm, 'characters'
end
