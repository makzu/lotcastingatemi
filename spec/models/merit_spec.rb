# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Merit, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:merit)).to be_valid
  end
end
