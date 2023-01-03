# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'

RSpec.describe 'Poisons' do
  describe 'for Characters' do
    it_behaves_like 'character trait', :poison, 'characters'
  end

  describe 'for QCs' do
    it_behaves_like 'character trait', :qc_poison, 'qcs'
  end

  describe 'for Battlegroups' do
    it_behaves_like 'character trait', :battlegroup_poison, 'battlegroups'
  end

  describe 'for Combat Actors' do
    it_behaves_like 'character trait', :combat_actor_poison, 'combat_actors'
  end
end
