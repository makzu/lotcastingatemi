# frozen_string_literal: true

require 'support/auth_token'

RSpec.shared_examples 'character' do |character_type, parent|
  ActiveJob::Base.queue_adapter = :test

  let(:trait) { create(character_type) }

  context 'when logged in' do
    describe 'creating a record' do
      it 'succeeds' do
        params = { trait.entity_type => FactoryBot.attributes_for(character_type) }
        params["#{parent}_id"] = trait.actor_id if parent

        expect do
          post "/api/v1/#{trait.entity_type}s/",
               params:  params,
               headers: authenticated_header(trait.player)
        end.to have_enqueued_job(CreateBroadcastJob)
          .and change { trait.class.count }.by 1

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end

    describe 'updating a record' do
      unless %i[battlegroup combat_actor battlegroup_combat_actor].include? character_type
        it 'succeeds for ties' do
          params = { trait.entity_type => { ties: [{ subject: 'Vincible Sword Princess (respect)', rating: 3, hidden: false }] } }
          patch "/api/v1/#{trait.entity_type}s/#{trait.id}",
                params:  params,
                headers: authenticated_header(trait.player),
                as:      :json

          expect(response.status).to eq 200
          expect(trait.class.find(trait.id).ties).to eq [{ 'subject' => 'Vincible Sword Princess (respect)', 'rating' => 3, 'hidden' => false }]
        end

        it 'succeeds for principles' do
          params = { trait.entity_type => { principles: [{ subject: "I don't have any bugs", rating: 2 }] } }
          patch "/api/v1/#{trait.entity_type}s/#{trait.id}",
                params:  params,
                headers: authenticated_header(trait.player),
                as:      :json

          expect(response.status).to eq 200
          expect(trait.class.find(trait.id).principles).to eq [{ 'subject' => "I don't have any bugs", 'rating' => 2 }]
        end
      end
    end

    describe 'duplicating a record' do
      it 'succeeds' do
        if %i[combat_actor battlegroup_combat_actor].exclude? character_type
          to_dupe = create(character_type, player: trait.player)
          expect do
            post "/api/v1/#{trait.entity_type}s/#{to_dupe.id}/duplicate",
                 headers: authenticated_header(trait.player)
          end.to have_enqueued_job(CreateBroadcastJob)
            .and change { trait.class.count }.by 1

          expect(response.content_type).to eq 'application/json'
          expect(response.status).to eq 200
        end
      end
    end

    describe 'showing a record' do
      it 'succeeds' do
        get "/api/v1/#{trait.entity_type}s/#{trait.id}",
            headers: authenticated_header(trait.player)

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end

    describe 'destroying a record' do
      it 'succeeds' do
        expect do
          delete "/api/v1/#{trait.entity_type}s/#{trait.id}",
                 headers: authenticated_header(trait.player)
        end.to change { trait.class.count }.by(-1)

        expect(response.content_type).to eq 'application/json'
        expect(response.status).to eq 200
      end
    end
  end

  context 'when not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post "/api/v1/#{trait.entity_type}s/"
        expect(response.status).to eq 401
      end
    end

    describe 'showing a record' do
      it 'returns an auth failure' do
        expect do
          get "/api/v1/#{trait.entity_type}s/#{trait.id}"
        end.to raise_error Pundit::NotAuthorizedError
      end
    end

    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end

    describe 'destroying a record' do
      it 'returns an auth failure' do
        delete "/api/v1/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
  end
end
