# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'Qcs', type: :request do
  it_behaves_like 'character', :qc

  ActiveJob::Base.queue_adapter = :test

  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  context 'while logged in' do
    describe 'duplicating a record' do
      it 'succeeds' do
        the_qc = create(:qc)

        expect do
          post "/api/v1/qcs/#{the_qc.id}/duplicate",
               headers: authenticated_header(the_qc.player)
        end.to have_enqueued_job(CreateBroadcastJob)
          .and change { Qc.count }.by 1

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end
  end
end
