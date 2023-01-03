# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Battlegroup do
  it 'has a valid factory' do
    expect(create(:battlegroup)).to be_valid
  end
end
