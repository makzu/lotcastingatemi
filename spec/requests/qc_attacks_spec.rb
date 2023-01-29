# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'
require 'support/auth_token'

RSpec.describe 'QcAttacks' do
  ActiveJob::Base.queue_adapter = :test

  let(:attack) { create(:qc_attack) }

  context 'when logged in' do
    describe 'updating a record' do
      it 'works for tags' do
        params = { qc_attack: { tags: %w[lethal melee balanced] }}
        expect do
          patch "/api/v1/qcs/#{attack.qc_attackable_id}/qc_attacks/#{attack.id}",
                params:,
                headers: authenticated_header(attack.player)
        end.to have_enqueued_job(UpdateBroadcastJob)

        expect(response).to have_http_status :ok
        expect(QcAttack.find(attack.id).tags).to eq %w[lethal melee balanced]
      end
    end
  end

  describe 'for QCs' do
    it_behaves_like 'character trait', :qc_attack, 'qcs'
  end

  describe 'for Battlegroups' do
    it_behaves_like 'character trait', :battlegroup_qc_attack, 'battlegroups'
  end
end
