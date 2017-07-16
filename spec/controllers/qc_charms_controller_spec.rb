# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcCharmsController, type: :controller do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
    @player = FactoryGirl.create(:player)
    @qc = FactoryGirl.create(:qc, player_id: @player.id)
    @qc_charm = FactoryGirl.create(:qc_charm, qc_id: @qc.id)
  end

  describe 'GET #show' do
    it 'returns http success' do
      request.headers['Authorization'] = authenticated_header(@player)

      get :show, params: { qc_id: @qc_charm.qc_id, id: @qc_charm.id, format: :json }

      expect(response).to have_http_status(:success)
    end

    it_behaves_like 'respond_to_unauthenticated', 'show'
  end

  describe 'POST #create' do
    context 'With valid attributes' do
      it 'Increases charm count by 1' do
        request.headers['Authorization'] = authenticated_header(@player)
        @qc_charm_params = FactoryGirl.attributes_for(:qc_charm, qc_id: @qc.id)

        expect { post :create, params: { qc_id: @qc.id, qc_charm: @qc_charm_params }, format: :json }.to change(QcCharm, :count).by(1)
      end
    end

    # context 'With invalid attributes' do
    #   it 'Increases charm count by 0' do
    #     request.headers['Authorization'] = authenticated_header(@player)
    #     @invalid_charm_params = FactoryGirl.attributes_for(:qc_charm, qc_id: 'Attribute')

    #     expect { post :create, params: { qc_id: @qc.id, qc_charm: @invalid_charm_params }, format: :json }.to change(QcCharm, :count).by(0)
    #   end
    # end

    it_behaves_like 'respond_to_unauthenticated', 'create'
  end

  describe 'DELETE #destroy' do
    it 'Decreases charm count by 1' do
      request.headers['Authorization'] = authenticated_header(@player)
      expect { delete :destroy, params: { qc_id: @qc_charm.qc_id, id: @qc_charm.id, format: :json } }.to change(QcCharm, :count).by(-1)
    end

    it_behaves_like 'respond_to_unauthenticated', 'destroy'
  end

  describe 'PATCH #update' do
    it 'Updates charm attributes' do
      request.headers['Authorization'] = authenticated_header(@player)
      @updated_charm_params = FactoryGirl.attributes_for(:qc_charm, qc_id: @qc.id, name: 'test1')

      expect(@qc_charm.name).not_to eq('test1')

      patch :update, params: { qc_id: @qc.id, id: @qc_charm.id, qc_charm: @updated_charm_params, format: :json }
      @qc_charm.reload

      expect(@qc_charm.name).to eq('test1')
    end

    it_behaves_like 'respond_to_unauthenticated', 'update'
  end
end
