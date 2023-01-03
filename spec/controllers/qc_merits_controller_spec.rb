# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::QcMeritsController do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  before do
    @player = create(:player)
    @qc = create(:qc, player_id: @player.id)
    @qc_merit = create(:qc_merit, qc_id: @qc.id)
  end

  describe 'PATCH #update' do
    it 'Updates merit attributes' do
      request.headers['Authorization'] = authenticated_header(@player)
      @updated_merit_params = attributes_for(:qc_merit, qc_id: @qc.id, name: 'test1')

      expect(@qc_merit.name).not_to eq('test1')

      patch :update, params: { qc_id: @qc.id, id: @qc_merit.id, qc_merit: @updated_merit_params, format: :json }
      @qc_merit.reload

      expect(@qc_merit.name).to eq('test1')
    end
  end
end
