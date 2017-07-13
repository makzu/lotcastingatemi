# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SolarCharacter, type: :model do
  it 'has a valid factory' do
    expect(FactoryGirl.create(:solar_character)).to be_valid
  end
end
