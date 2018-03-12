# frozen_string_literal: true

require 'rails_helper'
require 'support/shared_examples/character_trait'

RSpec.describe 'QcCharms', type: :request do
  it_behaves_like 'character trait', :qc_charm, 'qcs'
end
