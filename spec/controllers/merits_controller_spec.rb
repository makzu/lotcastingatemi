# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::MeritsController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
    @character = FactoryBot.create(:character, player_id: @player.id)
    @merit = FactoryBot.create(:merit, character_id: @character.id)
  end

  describe 'POST #create' do
    context 'With invalid attributes' do
      it 'Increases merit count by 0' do
        request.headers['Authorization'] = authenticated_header(@player)
        @invalid_merit_params = FactoryBot.attributes_for(:merit, rating: 9)

        expect { post :create, params: { character_id: @character.id, merit: @invalid_merit_params }, format: :json }.to change(Merit, :count).by(0)
      end
    end
  end

  describe 'PATCH #update' do
    context 'With valid attributes' do
      it 'Updates merit attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @updated_merit_params = FactoryBot.attributes_for(:merit, character_id: @character.id, merit_cat: 'innate')

        expect(@merit.merit_cat).to eq('story')

        patch :update, params: { character_id: @character.id, id: @merit.id, merit: @updated_merit_params, format: :json }
        @merit.reload

        expect(@merit.merit_cat).to eq('innate')
      end
    end

    context 'With invalid attributes' do
      it 'Updates merit attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @invalid_updated_merit_params = FactoryBot.attributes_for(:merit, character_id: @character.id, merit_cat: 'Invalid merit_cat')

        expect(@merit.merit_cat).to eq('story')

        patch :update, params: { character_id: @character.id, id: @merit.id, merit: @invalid_updated_merit_params, format: :json }
        @merit.reload

        expect(@merit.merit_cat).to eq('story')
      end
    end
  end
end
