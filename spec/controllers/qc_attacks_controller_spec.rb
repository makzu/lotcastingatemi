# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcAttacksController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
    @qc = FactoryBot.create(:qc, player_id: @player.id)
    @qc_attack = FactoryBot.create(:qc_attack, qc_attackable: @qc)
  end

  describe 'POST #create' do
    context 'With invalid attributes' do
      it 'Increases attack count by 0' do
        request.headers['Authorization'] = authenticated_header(@player)
        @invalid_attack_params = FactoryBot.attributes_for(:qc_attack, pool: -1)

        expect { post :create, params: { qc_id: @qc.id, qc_attack: @invalid_attack_params }, format: :json }.to change(QcAttack, :count).by(0)
      end
    end
  end

  describe 'PATCH #update' do
    it 'Updates attack attributes' do
      request.headers['Authorization'] = authenticated_header(@player)
      @updated_attack_params = FactoryBot.attributes_for(:qc_attack, qc_attackable_id: @qc.id, name: 'test1')

      expect(@qc_attack.name).not_to eq('test1')

      patch :update, params: { qc_id: @qc.id, id: @qc_attack.id, qc_attack: @updated_attack_params, format: :json }
      @qc_attack.reload

      expect(@qc_attack.name).to eq('test1')
    end
  end
end
