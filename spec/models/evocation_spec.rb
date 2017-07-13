# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Evocation, type: :model do
  it 'has a valid factory' do
    expect(FactoryGirl.create(:evocation)).to be_valid
  end
end
