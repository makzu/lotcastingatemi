# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SiderealCharacter do
  let(:character) { create(:sidereal_character) }

  describe 'mote pool' do
    it 'starts with the right number of motes' do
      expect(character.motes_personal_total).to eq 11
      expect(character.motes_peripheral_total).to eq 31
    end

    it 'updates as essence changes' do
      character.update(essence: 5)
      expect(character.motes_personal_total).to eq 19
      expect(character.motes_peripheral_total).to eq 55

      character.update(essence: 10)
      expect(character.motes_personal_total).to eq 29
      expect(character.motes_peripheral_total).to eq 85
    end
  end

  # describe 'caste and favored abilities' do
  #   it 'changes caste and favored abilities appropriately on aspect change' do
  #     character.update(caste: 'earth')
  #     expect(character.caste_abilities).to eq %w[ awareness craft integrity resistance war ]

  #     character.update(caste: 'air')
  #     expect(character.caste_abilities).to include 'occult'

  #     character.update(caste: 'fire')
  #     expect(character.caste_abilities).not_to include 'occult'
  #   end
  # end

  it_behaves_like 'convertable_character', :sidereal_character
end
