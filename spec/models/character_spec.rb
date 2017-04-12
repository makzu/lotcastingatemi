# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Character, type: :model do
  it 'has a valid factory' do
    expect(FactoryGirl.create(:character)).to be_valid
  end
end
