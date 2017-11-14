# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MartialArtsCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:martial_arts_charm)).to be_valid
  end
end
