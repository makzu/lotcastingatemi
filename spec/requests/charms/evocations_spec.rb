# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'Charms::Evocations' do
  it_behaves_like 'charm', :charms_evocation, 'characters'
end
