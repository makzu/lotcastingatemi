# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ChroniclesController, type: :controller do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
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
    context 'With valid attributes' do
      it 'Increases Chronicle count by 1' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle_params = FactoryBot.attributes_for(:chronicle, st_id: @player.id)

        expect { post :create, params: { chronicle: @chronicle_params }, format: :json }.to change(Chronicle, :count).by(1)
      end
    end

    # context 'With invalid attributes' do
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

  describe 'PATCH #update' do
    context 'With valid attributes' do
      it 'Updates character attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @updated_chronicle_params = FactoryBot.attributes_for(:chronicle, name: 'asdf asdf')

        expect(@chronicle.name).not_to eq('asdf asdf')

        patch :update, params: { id: @chronicle.id, chronicle: @updated_chronicle_params, format: :json }
        @chronicle.reload

        expect(@chronicle.name).to eq('asdf asdf')
      end
    end

    it_behaves_like 'respond_to_unauthenticated', 'update'
  end
end
