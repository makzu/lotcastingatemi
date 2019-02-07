# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/charm'

RSpec.describe 'Spells', type: :request do
  it_behaves_like 'charm', :spell, 'characters'
end
