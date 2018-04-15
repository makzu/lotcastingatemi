# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Charms::QcCharms', type: :request do
  it_behaves_like 'character trait', :qc_charm, 'qcs'
end
