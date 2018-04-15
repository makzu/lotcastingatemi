# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::MartialArtsCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:charms_martial_arts_charm)).to be_valid
  end
end
