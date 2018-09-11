# frozen_string_literal: true

require 'rails_helper'
require Rails.root.join('spec', 'controllers', 'shared_examples', 'respond_to_unauthenticated.rb')

RSpec.describe Api::V1::ChroniclesController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before do
    @player = FactoryBot.create(:player)
    @chronicle = FactoryBot.create(:chronicle, st_id: @player.id)
  end

  describe 'GET show' do
    it 'returns http success' do
      request.headers['Authorization'] = authenticated_header(@player)

      get :show, params: { id: @chronicle.id, format: :json }

      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'respond_to_unauthenticated', 'show'
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'Increases Chronicle count by 1' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle_params = FactoryBot.attributes_for(:chronicle, st_id: @player.id)

        expect { post :create, params: { chronicle: @chronicle_params }, format: :json }.to change(Chronicle, :count).by(1)
      end
    end

    # context 'with invalid attributes' do
    #   it 'Increases Chronicle count by 0' do
    #     request.headers['Authorization'] = authenticated_header(@player)
    #     @invalid_chronicle_params = FactoryBot.attributes_for(:chronicle, st_id: 'Invalid Attribute')

    #     expect { post :create, params: { chronicle: @invalid_chronicle_params }, format: :json }.to change(Chronicle, :count).by(0)
    #   end
    # end

    it_behaves_like 'respond_to_unauthenticated', 'create'
  end

  describe 'DELETE #destroy' do
    it 'Decreases Chronicle count by 1' do
      request.headers['Authorization'] = authenticated_header(@player)

      expect { delete :destroy, params: { id: @chronicle.id, format: :json } }.to change(Chronicle, :count).by(-1)
    end

    it_behaves_like 'respond_to_unauthenticated', 'destroy'
  end
end
