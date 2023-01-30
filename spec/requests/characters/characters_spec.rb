# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character'

RSpec.describe 'Characters' do
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
              params:  { character: { attr_wits: 4 }}

        expect(response).to have_http_status :ok
        expect(JSON.parse(response.body)['attr_wits']).to eq 4
        character.reload
        expect(character.attr_wits).to eq(4)
      end
    end

    describe 'with invalid changes' do
      it 'refuses negative essence' do
        patch "/api/v1/characters/#{character.id}",
              headers: authenticated_header(character.player),
              params:  { character: { essence: -1 }}

        expect(response).to have_http_status :bad_request
        character.reload
        expect(character.essence).not_to eq(-1)
      end
    end
  end

  context 'when changing types' do
    describe 'with valid types' do
      %w[SolarCharacter DragonbloodCharacter CustomAbilityCharacter CustomAttributeCharacter CustomEssenceCharacter].each do |type|
        it "works for #{type}" do
          post "/api/v1/characters/#{character.id}/change_type",
               headers: authenticated_header(character.player),
               params:  { type: }

          expect(response).to have_http_status :ok
        end
      end
    end

    describe 'with an invalid type' do
      it 'throws an error' do
        post "/api/v1/characters/#{character.id}/change_type",
             headers: authenticated_header(character.player),
             params:  { type: 'NotAType' }

        expect(response).to have_http_status :bad_request
      end
    end
  end
end
