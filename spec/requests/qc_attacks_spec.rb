# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'QcAttacks', type: :request do
  describe 'for QCs' do
    it_behaves_like 'character trait', :qc_attack, 'qcs'
  end
  describe 'for Battlegroups' do
    it_behaves_like 'character trait', :battlegroup_qc_attack, 'battlegroups'
  end
end
