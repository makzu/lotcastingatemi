# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CombatActor do
  it 'has a valid factory' do
    expect(create(:combat_actor)).to be_valid
    expect(create(:battlegroup_combat_actor)).to be_valid
  end
end
