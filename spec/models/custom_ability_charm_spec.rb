# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:custom_ability_charm)).to be_valid
  end
end
