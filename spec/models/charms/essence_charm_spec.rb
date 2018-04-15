# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::EssenceCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:charms_essence_charm)).to be_valid
  end
end
