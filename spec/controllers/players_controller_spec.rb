require 'rails_helper'

RSpec.describe Api::V1::PlayersController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      @player = FactoryGirl.create(:player)

      get :show, params: { id: @player, format: :json }

      expect(response).to have_http_status(:success)
    end
  end

end
