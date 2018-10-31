# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Charms::EssenceCharm, type: :model do
  it 'can switch from AbilityCharm' do
    old_charm = create(:charms_ability_charm)
    new_charm = Charms::EssenceCharm.from_charm!(old_charm)
    expect(new_charm).to be_valid
  end

  it 'can switch from AttributeCharm' do
    old_charm = create(:charms_attribute_charm)
    new_charm = Charms::EssenceCharm.from_charm!(old_charm)
    expect(new_charm).to be_valid
  end
end
