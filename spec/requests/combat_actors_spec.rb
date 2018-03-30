# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'CombatActors', type: :request do
  describe 'for QCs' do
    it_behaves_like 'character', :combat_actor, 'qc'
  end
  describe 'for Battlegroups' do
    it_behaves_like 'character', :battlegroup_combat_actor, 'battlegroup'
  end
end
