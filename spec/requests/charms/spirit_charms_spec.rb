# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'SpiritCharms' do
  it_behaves_like 'charm', :charms_spirit_charm, 'characters'
end
