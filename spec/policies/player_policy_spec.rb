# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PlayerPolicy do
  subject { described_class.new(player, owner) }

  let(:st) { create(:player) }
  let(:owner) { create(:player) }
  let(:other_player) { create(:player) }
  let(:chronicle) { create(:chronicle, st: st, players: [other_player]) }

  context 'when the owner of the character' do
    let(:player) { owner }

    it { is_expected.to permit_actions(%i[index update show destroy]) }
  end

  context 'when the ST' do
    let(:player) { st }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'when another player in a chronicle' do
    let(:player) { other_player }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'when a user that has nothing to do with the character' do
    let(:player) { create(:player) }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'when a user that is not logged in' do
    let(:player) { nil }

    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end
end
