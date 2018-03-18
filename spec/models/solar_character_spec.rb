# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SolarCharacter, type: :model do
  let(:character) { create(:solar_character) }

  it 'has a valid factory' do
    expect(character).to be_valid
  end

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
  end
end
