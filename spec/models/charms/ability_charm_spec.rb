# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::AbilityCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:charms_ability_charm)).to be_valid
  end
end
