# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::AttributeCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:charms_attribute_charm)).to be_valid
  end
end
