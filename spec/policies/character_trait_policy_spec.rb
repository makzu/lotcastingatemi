# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CharacterTraitPolicy do
  subject { described_class.new(player, trait) }

  let(:st) { FactoryBot.create(:player) }
  let(:owner) { FactoryBot.create(:player) }
  let(:other_player) { FactoryBot.create(:player) }
  let(:chronicle) { FactoryBot.create(:chronicle, st: st, players: [other_player]) }
  let(:character) { FactoryBot.create(:character, chronicle: chronicle, player: owner) }
  let(:trait) { FactoryBot.create(:weapon, character: character) }

  context 'for the owner of the character' do
    let(:player) { owner }

    it { is_expected.to permit_actions(%i[update show destroy]) }
  end

  context 'for the ST' do
    let(:player) { st }

    it { is_expected.to permit_actions(%i[update show destroy]) }
  end

  context 'for another player in a chronicle' do
    let(:player) { other_player }

    it { is_expected.to permit_action(:show) }
    it { is_expected.to forbid_actions(%i[update destroy]) }
  end

  context 'a user that has nothing to do with the character' do
    let(:player) { FactoryBot.create(:player) }
    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'a user that is not logged in' do
    let(:player) { nil }
    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end
end
