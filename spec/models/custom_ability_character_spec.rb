# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharacter, type: :model do
  describe 'converting types' do
    %i[
      character solar_character dragonblood_character lunar_character
      custom_attribute_character custom_essence_character
    ].each do |char|
      it "works for #{char}" do
        g = create(char)
        m = CustomAbilityCharacter.from_character!(g)
        expect(m).to be_valid
      end
    end
  end
end
