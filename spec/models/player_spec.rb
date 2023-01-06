# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Player do
  it 'has a valid factory' do
    expect(create(:player)).to be_valid
  end
end
