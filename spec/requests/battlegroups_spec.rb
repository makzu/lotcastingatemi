# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'Battlegroups', type: :request do
  it_behaves_like 'character', :battlegroup

  ActiveJob::Base.queue_adapter = :test

  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  context 'when logged in' do
    describe 'creating a battlegroup from a QC' do
      it 'succeeds' do
        the_qc = create(:qc)
        create(:qc_attack, qc_attackable: the_qc)

        expect do
          post "/api/v1/battlegroups/create_from_qc/#{the_qc.id}",
               headers: authenticated_header(the_qc.player)
        end.to have_enqueued_job(CreateBroadcastJob)
          .twice
          .and(change(Battlegroup, :count).by(1))
          .and(change(QcAttack, :count).by(1))

        expect(response.media_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end
  end
end
