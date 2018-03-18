# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcsController, type: :controller do
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
    @qc = FactoryBot.create(:qc, player_id: @player.id)
  end

  describe 'POST #create' do
    context 'With invalid attributes' do
      it 'Increases qc count by 0' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @invalid_qc_params = FactoryBot.attributes_for(:qc, essence: 11)

        expect { post :create, params: { qc: @invalid_qc_params }, format: :json }.to change(Qc, :count).by(0)
      end
    end
  end

  describe 'PATCH #update' do
    context 'With valid attributes' do
      it 'Updates qc attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @updated_qc_params = FactoryBot.attributes_for(:qc, essence: 5)

        expect(@qc.essence).not_to eq(5)

        patch :update, params: { id: @qc.id, qc: @updated_qc_params, format: :json }
        @qc.reload

        expect(@qc.essence).to eq(5)
      end
    end

    context 'With invalid attributes' do
      it 'Updates qc attributes' do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryBot.create(:chronicle)
        @invalid_updated_qc_params = FactoryBot.attributes_for(:qc, essence: -1)

        expect(@qc.essence).not_to eq(-1)

        patch :update, params: { id: @qc.id, qc: @invalid_updated_qc_params, format: :json }
        @qc.reload

        expect(@qc.essence).not_to eq(-1)
      end
    end
  end
end
