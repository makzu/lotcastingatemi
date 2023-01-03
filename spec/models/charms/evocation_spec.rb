# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::Evocation do
  it 'has a valid factory' do
    expect(create(:charms_evocation)).to be_valid
  end
end
