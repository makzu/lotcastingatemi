# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Weapon, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:weapon)).to be_valid
  end
end
