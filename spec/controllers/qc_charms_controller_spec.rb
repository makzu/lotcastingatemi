# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcCharmsController, type: :controller do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before(:each) do
    @player = FactoryBot.create(:player)
    @qc = FactoryBot.create(:qc, player_id: @player.id)
    @qc_charm = FactoryBot.create(:qc_charm, qc_id: @qc.id)
  end

  describe 'PATCH #update' do
    it 'Updates charm attributes' do
      request.headers['Authorization'] = authenticated_header(@player)
      @updated_charm_params = FactoryBot.attributes_for(:qc_charm, qc_id: @qc.id, name: 'test1')

      expect(@qc_charm.name).not_to eq('test1')

      patch :update, params: { qc_id: @qc.id, id: @qc_charm.id, qc_charm: @updated_charm_params, format: :json }
      @qc_charm.reload

      expect(@qc_charm.name).to eq('test1')
    end
  end
end
