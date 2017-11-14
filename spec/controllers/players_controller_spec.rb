# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PlayersController, type: :controller do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
  end

  describe 'GET #show' do
    it 'returns http success' do
      request.headers['Authorization'] = authenticated_header(@player)

      get :show, params: { id: @player, format: :json }

      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'respond_to_unauthenticated', 'show'
  end
end
