# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DragonbloodCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:dragonblood_charm)).to be_valid
  end
end
