# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DragonbloodCharacter, type: :model do
  it 'has a valid factory' do
    expect(FactoryBot.create(:dragonblood_character)).to be_valid
  end
end
