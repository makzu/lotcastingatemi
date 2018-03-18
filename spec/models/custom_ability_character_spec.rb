# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharacter, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:custom_ability_character)).to be_valid
  end
end
