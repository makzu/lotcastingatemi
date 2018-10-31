# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DragonbloodCharacter, type: :model do
  let(:character) { create(:dragonblood_character) }

  describe 'mote pool' do
    it 'starts with the right number of motes' do
      expect(character.motes_personal_total).to eq 13
      expect(character.motes_peripheral_total).to eq 31
    end

    it 'updates as essence changes' do
      character.update(essence: 5)
      expect(character.motes_personal_total).to eq 16
      expect(character.motes_peripheral_total).to eq 43

      character.update(essence: 10)
      expect(character.motes_personal_total).to eq 21
      expect(character.motes_peripheral_total).to eq 63
    end
  end

  describe 'caste and favored abilities' do
    it 'changes caste and favored abilities appropriately on aspect change' do
      character.update(caste: 'earth')
      expect(character.caste_abilities).to eq %w[ awareness craft integrity resistance war ]

      character.update(caste: 'air')
      expect(character.caste_abilities).to include 'occult'

      character.update(caste: 'fire')
      expect(character.caste_abilities).not_to include 'occult'
    end
  end

  describe 'exalt type' do
    it 'does not change while the class type stays the same' do
      character.update(aspect: false, exalt_type: 'abyssal', excellency: 'essence')

      expect(character).to have_attributes(
        aspect: true,
        exalt_type: 'Dragon-Blood',
        excellency: 'dragonblood'
      )
    end
  end

  describe 'converting types' do
    %i[
      character solar_character
      custom_ability_character custom_attribute_character custom_essence_character
    ].each do |char|
      it "works for #{char}" do
        g = create(char)
        m = DragonbloodCharacter.from_character!(g)
        expect(m).to be_valid
      end
    end
  end
end
