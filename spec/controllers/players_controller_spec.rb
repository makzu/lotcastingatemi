# frozen_string_literal: true

require 'rails_helper'
require Rails.root.join('spec', 'controllers', 'shared_examples', 'respond_to_unauthenticated.rb')

RSpec.describe Api::V1::PlayersController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before do
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
