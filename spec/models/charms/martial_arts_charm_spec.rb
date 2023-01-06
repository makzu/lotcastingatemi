# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::MartialArtsCharm do
  it 'has a valid factory' do
    expect(create(:charms_martial_arts_charm)).to be_valid
  end
end
