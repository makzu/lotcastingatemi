# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:player)).to be_valid
  end
end
