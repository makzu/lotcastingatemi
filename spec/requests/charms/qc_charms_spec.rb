# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'
require 'support/auth_token'

RSpec.describe 'Charms::QcCharms' do
  ActiveJob::Base.queue_adapter = :test

  let(:charm) { create(:qc_charm) }

  context 'when logged in' do
    describe 'updating a record' do
      it 'works for keywords' do
        params = { qc_charm: { keywords: %w[simple perilous] }}
        expect do
          patch "/api/v1/qcs/#{charm.qc_id}/qc_charms/#{charm.id}",
                params:,
                headers: authenticated_header(charm.player)
        end.to have_enqueued_job(UpdateBroadcastJob)

        expect(response).to have_http_status :ok
        expect(QcCharm.find(charm.id).keywords).to eq %w[simple perilous]
      end
    end
  end

  it_behaves_like 'character trait', :qc_charm, 'qcs'
end
