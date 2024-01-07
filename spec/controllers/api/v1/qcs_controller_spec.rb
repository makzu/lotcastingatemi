# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcsController do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  let(:player) { create(:player) }
  let(:qc) { create(:qc, player_id: player.id) }

  describe 'POST #create' do
    context 'with invalid attributes' do
      it 'Increases qc count by 0' do
        request.headers['Authorization'] = authenticated_header(player)
        invalid_qc_params = attributes_for(:qc, essence: 11)

        expect { post :create, params: { qc: invalid_qc_params }, format: :json }.not_to change(Qc, :count)
      end
    end
  end

  describe 'PATCH #update' do
    context 'with valid attributes' do
      it 'Updates qc attributes' do
        request.headers['Authorization'] = authenticated_header(player)
        updated_qc_params = attributes_for(:qc, essence: 5)

        expect(qc.essence).not_to eq(5)

        patch :update, params: { id: qc.id, qc: updated_qc_params, format: :json }
        qc.reload

        expect(qc.essence).to eq(5)
      end
    end

    context 'with invalid attributes' do
      it 'Updates qc attributes' do
        request.headers['Authorization'] = authenticated_header(player)
        invalid_updated_qc_params = attributes_for(:qc, essence: -1)

        expect(qc.essence).not_to eq(-1)

        patch :update, params: { id: qc.id, qc: invalid_updated_qc_params, format: :json }
        qc.reload

        expect(qc.essence).not_to eq(-1)
      end
    end
  end
end
