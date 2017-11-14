# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Spell, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:spell)).to be_valid
  end
end
