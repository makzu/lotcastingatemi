# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Merit do
  it 'has a valid factory' do
    expect(create(:merit)).to be_valid
  end
end
