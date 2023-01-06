# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::AbilityCharm do
  it 'can switch from AttributeCharm' do
    old_charm = create(:charms_attribute_charm)
    new_charm = described_class.from_charm!(old_charm)
    expect(new_charm).to be_valid
  end

  it 'can switch from EssenceCharm' do
    old_charm = create(:charms_essence_charm)
    new_charm = described_class.from_charm!(old_charm)
    expect(new_charm).to be_valid
  end
end
