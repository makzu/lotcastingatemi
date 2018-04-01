# frozen_string_literal: true

RSpec.shared_examples 'character trait' do |trait_type, parent_type|
  ActiveJob::Base.queue_adapter = :test

  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  let(:trait) { create(trait_type) }

  context 'while logged in' do
    describe 'creating a record' do
      it 'succeeds' do
        params = { trait.entity_type => FactoryBot.attributes_for(trait_type) }
        expect do
          post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/",
               params:  params,
               headers: authenticated_header(trait.player)
        end.to have_enqueued_job(CreateBroadcastJob)
          .and change { trait.class.count }.by(1)

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end

    describe 'showing a record' do
      it 'succeeds' do
        get "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}",
            headers: authenticated_header(trait.player)

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end

    describe 'destroying a record' do
      it 'succeeds' do
        expect do
          delete "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}",
                 headers: authenticated_header(trait.player)
        end.to change { trait.class.count }.by(-1)

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end
  end

  context 'while not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/"
        expect(response.status).to eq 401
      end
    end
    describe 'showing a record' do
      it 'returns an auth failure' do
        get "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
    describe 'destroying a record' do
      it 'returns an auth failure' do
        delete "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
  end
end
