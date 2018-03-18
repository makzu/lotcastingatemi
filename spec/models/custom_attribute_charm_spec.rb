# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAttributeCharm, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:custom_attribute_charm)).to be_valid
  end
end
