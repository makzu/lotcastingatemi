# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Spell do
  it 'has a valid factory' do
    expect(create(:spell)).to be_valid
  end
end
