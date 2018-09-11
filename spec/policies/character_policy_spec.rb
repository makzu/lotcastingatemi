# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CharacterPolicy do
  subject { described_class.new(player, character) }

  let(:st) { FactoryBot.create(:player) }
  let(:owner) { FactoryBot.create(:player) }
  let(:other_player) { FactoryBot.create(:player) }
  let(:chronicle) { FactoryBot.create(:chronicle, st: st, players: [other_player]) }
  let(:character) { FactoryBot.create(:character, chronicle: chronicle, player: owner) }

  context 'when the owner of the character' do
    let(:player) { owner }

    it { is_expected.to permit_actions(%i[update show destroy]) }
  end

  context 'when the ST' do
    let(:player) { st }

    it { is_expected.to permit_actions(%i[update show]) }
    it { is_expected.to forbid_action(:destroy) }
  end

  context 'when another player in a chronicle' do
    let(:player) { other_player }

    it { is_expected.to permit_action(:show) }
    it { is_expected.to forbid_actions(%i[update destroy]) }
  end

  context 'when a user that has nothing to do with the character' do
    let(:player) { FactoryBot.create(:player) }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'when a user that is not logged in' do
    let(:player) { nil }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end
end
