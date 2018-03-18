# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Battlegroup, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:battlegroup)).to be_valid
  end
end
