# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'Charms::EssenceCharms' do
  it_behaves_like 'charm', :charms_essence_charm, 'characters'
end
