# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CombatActor, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:combat_actor)).to be_valid
    expect(FactoryBot.create(:battlegroup_combat_actor)).to be_valid
  end
end
