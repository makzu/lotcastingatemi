# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CustomAbilityCharacter do
  describe 'converting types' do
    %i[
      character solar_character dragonblood_character lunar_character sidereal_character
      custom_attribute_character custom_essence_character
    ].each do |char|
      it "works for #{char}" do
        g = create(char)
        m = described_class.from_character!(g)
        expect(m).to be_valid
      end
    end
  end
end
