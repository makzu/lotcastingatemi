# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'Characters', type: :request do
  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  let(:character) { create(:character) }

  it_behaves_like 'character', :character

  context 'when updating a character' do
    describe 'with valid changes' do
      it 'updates attributes' do
        patch "/api/v1/characters/#{character.id}",
              headers: authenticated_header(character.player),
              params: { character: { attr_wits: 4 } }

        expect(response.status).to eq 200
        expect(JSON.parse(response.body)['attr_wits']).to eq 4
        character.reload
        expect(character.attr_wits).to eq(4)
      end
    end

    describe 'with invalid changes' do
      it 'refuses negative essence' do
        patch "/api/v1/characters/#{character.id}",
              headers: authenticated_header(character.player),
              params: { character: { essence: -1 } }

        expect(response.status).to eq 400
        expect(JSON.parse(response.body)).to have_key('essence')
        character.reload
        expect(character.essence).not_to eq(-1)
      end
    end
  end
end
