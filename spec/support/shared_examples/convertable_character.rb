# frozen_string_literal: true

RSpec.shared_examples 'convertable_character' do |character_type|
  exalt_types = %i[
    character solar_character dragonblood_character lunar_character sidereal_character abyssal_character alchemical_character infernal_character
    custom_ability_character custom_attribute_character custom_essence_character
  ]

  describe 'converting from' do
    (exalt_types - [character_type]).each do |char|
      it "#{char} works" do
        g = create(char)
        m = described_class.from_character!(g)
        expect(m).to be_valid
      end
    end
  end
end
