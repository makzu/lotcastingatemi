# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Identity, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:identity)).to be_valid
  end
end
