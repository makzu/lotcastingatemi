# frozen_string_literal: true

require 'rails_helper'

RSpec.describe LunarCharacter do
  let(:character) { create(:lunar_character) }

  describe 'mote pool' do
    it 'starts with the right number of motes' do
      expect(character.motes_personal_total).to eq 16
      expect(character.motes_peripheral_total).to eq 38
    end

    it 'updates as essence changes' do
      character.update(essence: 5)
      expect(character.motes_personal_total).to eq 20
      expect(character.motes_peripheral_total).to eq 54

      character.update(essence: 10)
      expect(character.motes_personal_total).to eq 25
      expect(character.motes_peripheral_total).to eq 74
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

  include_examples 'convertable_character', :lunar_character
end
