# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::SpiritCharm do
  it 'has a valid factory' do
    expect(create(:charms_spirit_charm)).to be_valid
  end
end
