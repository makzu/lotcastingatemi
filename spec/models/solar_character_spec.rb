# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SolarCharacter, type: :model do
  let(:character) { create(:solar_character) }

  describe 'mote pool' do
    it 'starts with the right number of motes' do
      expect(character.motes_personal_total).to eq 13
      expect(character.motes_peripheral_total).to eq 33
    end

    it 'updates as essence changes' do
      character.update(essence: 2)
      expect(character.motes_personal_total).to eq 16
      expect(character.motes_peripheral_total).to eq 40
      character.update(essence: 10)
      expect(character.motes_personal_total).to eq 40
      expect(character.motes_peripheral_total).to eq 96
    end
  end

  describe 'caste and favored abilities' do
    it 'adds to Caste when Supernal is changed' do
      character.update(caste_abilities: [], supernal_ability: 'melee')
      expect(character.caste_abilities).to include 'melee'
      character.update(supernal_ability: 'archery')
      expect(character.caste_abilities).to include 'archery'
      character.update(supernal_ability: 'brawl')
      expect(character.caste_abilities).to include 'brawl'
      character.update(supernal_ability: 'war')
      expect(character.caste_abilities).to include 'war'
    end

    it 'changes caste and favored abilities appropriately on caste change' do
      character.update(caste: 'eclipse', supernal_ability: 'occult')
      character.update(caste: 'twilight')
      expect(character.supernal_ability).to eq 'occult'
      expect(character.caste_abilities).to include 'occult'

      character.update(caste: 'dawn')
      expect(character.supernal_ability).to eq nil
      expect(character.caste_abilities).not_to include 'occult'
    end
  end

  describe 'exalt type' do
    it 'does not change while the class type stays the same' do
      character.update(aspect: true, exalt_type: 'abyssal', excellency: 'essence')
      expect(character.aspect).to eq false
      expect(character.exalt_type).to eq 'Solar'
      expect(character.excellency).to eq 'solar'
    end
  end

  describe 'converting types' do
    %i[
      character dragonblood_character lunar_character
      custom_ability_character custom_attribute_character custom_essence_character
    ].each do |char|
      it "works for #{char}" do
        g = create(char)
        m = SolarCharacter.from_character!(g)
        expect(m).to be_valid
      end
    end
  end
end
