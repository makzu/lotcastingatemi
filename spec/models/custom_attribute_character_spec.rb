# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAttributeCharacter, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:custom_attribute_character)).to be_valid
  end
end
