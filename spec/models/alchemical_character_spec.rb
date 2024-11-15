# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AlchemicalCharacter do
  let(:character) { create(:alchemical_character) }

  describe 'mote pool' do
    it 'starts with the right number of motes' do
      expect(character.motes_personal_total).to eq 13
      expect(character.motes_peripheral_total).to eq 33
    end

    it 'updates as essence changes' do
      character.update(essence: 5)
      expect(character.motes_personal_total).to eq 21
      expect(character.motes_peripheral_total).to eq 57

      character.update(essence: 10)
      expect(character.motes_personal_total).to eq 31
      expect(character.motes_peripheral_total).to eq 87
    end
  end

  describe 'caste and favored attributes' do
    it 'changes caste and favored attributes appropriately on aspect change' do
      character.update(caste: 'moonsilver', favored_attributes: %w[ intelligence ])
      expect(character.caste_attributes).to eq %w[ appearance dexterity wits ]

      character.update(caste: 'starmetal')
      expect(character.caste).to eq 'starmetal'
      expect(character.caste_attributes).to eq %w[ dexterity intelligence manipulation ]
      expect(character.favored_attributes).to eq []
    end
  end

  include_examples 'convertable_character', :alchemical_character
end
