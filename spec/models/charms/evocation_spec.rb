# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::Evocation, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:charms_evocation)).to be_valid
  end
end
