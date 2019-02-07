# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'SpiritCharms', type: :request do
  it_behaves_like 'charm', :charms_spirit_charm, 'characters'
end
