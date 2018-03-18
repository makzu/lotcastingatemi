# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CharactersController, type: :controller do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
    @character = FactoryBot.create(:character, player_id: @player.id)
  end

  describe 'POST #create' do
    context 'With invalid attributes' do
      it 'Increases Character count by 0' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @invalid_character_params = FactoryBot.attributes_for(:character, essence: 11)

        expect { post :create, params: { character: @invalid_character_params }, format: :json }.to change(Character, :count).by(0)
      end
    end
  end

  describe 'PATCH #update' do
    context 'With valid attributes' do
      it 'Updates character attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @updated_character_params = FactoryBot.attributes_for(:character, essence: 5, attr_wits: 5)

        expect(@character.essence).not_to eq(5)
        expect(@character.attr_wits).not_to eq(5)

        patch :update, params: { id: @character.id, character: @updated_character_params, format: :json }
        @character.reload

        expect(@character.essence).to eq(5)
        expect(@character.attr_wits).to eq(5)
      end
    end

    context 'With invalid attributes' do
      it 'Updates character attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @invalid_updated_character_params = FactoryBot.attributes_for(:character, essence: -1)

        expect(@character.essence).not_to eq(-1)

        patch :update, params: { id: @character.id, character: @invalid_updated_character_params, format: :json }
        @character.reload

        expect(@character.essence).not_to eq(-1)
      end
    end
  end
end
