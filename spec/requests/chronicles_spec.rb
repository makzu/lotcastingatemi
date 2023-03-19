# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Chronciles' do
  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  let(:chronicle) { create(:chronicle) }

  context 'when logged in as ST' do
    describe 'renaming a chronicle' do
      it 'works' do
        patch "/api/v1/chronicles/#{chronicle.id}",
              headers: authenticated_header(chronicle.st),
              params:  { chronicle: { name: 'Mystic Quest' }}

        expect(response).to have_http_status :ok
        expect(response.parsed_body['name']).to eq 'Mystic Quest'
        chronicle.reload
        expect(chronicle.name).to eq 'Mystic Quest'
      end
    end

    describe 'deleting a chronicle' do
      it 'works' do
        character = create(:character, chronicle_id: chronicle.id)
        qc = create(:qc, chronicle_id: chronicle.id)
        battlegroup = create(:battlegroup, chronicle_id: chronicle.id)
        delete "/api/v1/chronicles/#{chronicle.id}",
               headers: authenticated_header(chronicle.st)

        expect(response).to have_http_status :ok
        character.reload
        expect(character.chronicle_id).to be_nil
        qc.reload
        expect(qc.chronicle_id).to be_nil
        battlegroup.reload
        expect(battlegroup.chronicle_id).to be_nil
      end
    end
  end

  context 'when logged in as a player in the Chronicle' do
    let(:not_the_st) { create(:player, chronicles: [chronicle]) }

    %i[character qc battlegroup].each do |char|
      describe "adding a #{char} to a chronicle" do
        let(:character) { create(char, player: not_the_st) }

        it 'works' do
          post "/api/v1/chronicles/#{chronicle.id}/add_#{char}/#{character.id}",
               headers: authenticated_header(not_the_st)

          expect(response).to have_http_status :ok
          chronicle.reload
          expect(chronicle.send("#{char}s")).to include character
        end
      end

      describe "remove a #{char} from a chronicle" do
        let(:character) { create(char, player: not_the_st) }

        it 'works' do
          post "/api/v1/chronicles/#{chronicle.id}/remove_#{char}/#{character.id}",
               headers: authenticated_header(not_the_st),
               params:  { char.to_s => { chronicle_id: nil }}

          expect(response).to have_http_status :ok
          chronicle.reload
          expect(chronicle.send("#{char}s")).not_to include character
        end
      end
    end

    describe 'attempting to join again' do
      it 'does not create a duplicate entry' do
        post '/api/v1/chronicles/join',
             headers: authenticated_header(not_the_st),
             params:  { invite_code: chronicle.invite_code }

        expect(ChroniclePlayer.count).to eq 1
      end
    end
  end

  context 'when logged in as a player not in the chronicle' do
    let(:player) { create(:player) }

    describe 'joining a chronicle open to new players' do
      it 'works' do
        post '/api/v1/chronicles/join',
             headers: authenticated_header(player),
             params:  { invite_code: chronicle.invite_code }

        expect(response).to have_http_status :ok
        chronicle.reload
        expect(chronicle.players).to include player
      end
    end
  end

  context 'when not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post '/api/v1/chronicles/'
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'showing a record' do
      it 'returns an auth failure' do
        get "/api/v1/chronicles/#{chronicle.id}"
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/chronicles/#{chronicle.id}"
        expect(response).to have_http_status :unauthorized
      end
    end

    describe 'destroying a record' do
      it 'returns an auth failure' do
        delete "/api/v1/chronicles/#{chronicle.id}"
        expect(response).to have_http_status :unauthorized
      end
    end
  end
end
