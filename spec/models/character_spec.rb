# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Character, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:character)).to be_valid
  end
end
