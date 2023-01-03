# frozen_string_literal: true

require 'support/auth_token'

RSpec.shared_examples 'character trait' do |trait_type, parent_type|
  ActiveJob::Base.queue_adapter = :test

  let(:trait) { create(trait_type) }

  context 'when logged in' do
    describe 'creating a record' do
      it 'succeeds' do
        params = { trait.entity_type => attributes_for(trait_type) }
        expect do
          post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/",
               params:  params,
               headers: authenticated_header(trait.player)
        end.to have_enqueued_job(CreateBroadcastJob)
          .and change { trait.class.count }.by(1)

        expect(response.media_type).to eq 'application/json'
        expect(response).to have_http_status :ok
      end

      it 'succeeds when creating an empty record' do
        unless trait.entity_type == 'charm'
          expect do
            post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/",
                 params:  {},
                 headers: authenticated_header(trait.player)
          end.to have_enqueued_job(CreateBroadcastJob)
            .and change { trait.class.count }.by(1)
        end
      end
    end

    describe 'showing a record' do
      it 'succeeds' do
        get "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}",
            headers: authenticated_header(trait.player)

        expect(response.media_type).to eq 'application/json'
        expect(response).to have_http_status :ok
      end
    end

    describe 'destroying a record' do
      it 'succeeds' do
        expect do
          delete "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}",
                 headers: authenticated_header(trait.player)
        end.to change { trait.class.count }.by(-1)

        expect(response.media_type).to eq 'application/json'
        expect(response).to have_http_status :ok
      end
    end
  end

  context 'when not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/"
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'showing a record' do
      it 'returns an auth failure' do
        get "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'destroying a record' do
      it 'returns an auth failure' do
        delete "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response).to have_http_status :unauthorized
      end
    end
  end
end
