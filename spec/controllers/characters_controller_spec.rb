# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CharactersController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
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
end
