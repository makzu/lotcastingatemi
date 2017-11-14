# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ChroniclePolicy do
  subject { described_class.new(player, chronicle) }

  let(:st) { FactoryBot.create(:player) }
  let(:other_player) { FactoryBot.create(:player) }
  let(:chronicle) { FactoryBot.create(:chronicle, st: st, players: [other_player]) }

  context 'for the ST' do
    let(:player) { st }

    it { is_expected.to permit_actions(%i[update show destroy]) }
  end

  context 'for another player in a chronicle' do
    let(:player) { other_player }

    it { is_expected.to permit_action(:show) }
    it { is_expected.to forbid_actions(%i[update destroy]) }
  end

  context 'a user that has nothing to do with the chronicle' do
    let(:player) { FactoryBot.create(:player) }
    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end

  context 'a user that is not logged in' do
    let(:player) { nil }
    it { is_expected.to forbid_actions(%i[update show destroy]) }
  end
end
