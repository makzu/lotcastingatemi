require 'rails_helper'
require "#{Rails.root}/spec/controllers/shared_examples/respond_to_unauthenticated.rb"

RSpec.describe Api::V1::QcsController, type: :controller do

  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    "Bearer #{token}"
  end

  before(:each) do
    @player = FactoryGirl.create(:player)
    @qc = FactoryGirl.create(:qc, player_id: @player.id)
  end

  describe "GET #show" do
    it "returns http success" do
      request.headers['Authorization'] = authenticated_header(@player)
      get :show, params: { id: @qc, format: :json }
      expect(response).to have_http_status(:success)
    end

    it_behaves_like "respond_to_unauthenticated", 'show'
  end

  describe "POST #create" do
    context "With valid attributes" do
      it "Increases qc count by 1" do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryGirl.create(:chronicle)
        @qc_params = FactoryGirl.attributes_for(:qc, chronicle_id: @chronicle.id, player_id: @player.id)

        expect { post :create, params: { :qc => @qc_params }, format: :json }.to change(Qc, :count).by(1)
      end
    end

    context "With invalid attributes" do
      it "Increases qc count by 0" do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryGirl.create(:chronicle)
        @invalid_qc_params = FactoryGirl.attributes_for(:qc, chronicle_id: "Invalid", player_id: "Attribute")

        expect { post :create, params: { :qc => @invalid_qc_params }, format: :json }.to change(Qc, :count).by(0)
      end
    end

    it_behaves_like "respond_to_unauthenticated", 'create'
  end

  describe "DELETE #destroy" do
    it "Decreases qc count by 1" do
      request.headers['Authorization'] = authenticated_header(@player)
      expect { delete :destroy, params: { id: @qc.id, format: :json } }.to change(Qc, :count).by(-1)
    end

    it_behaves_like "respond_to_unauthenticated", 'destroy'
  end

  describe "PATCH #update" do
    context "With valid attributes" do
      it "Updates qc attributes" do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryGirl.create(:chronicle)
        @updated_qc_params = FactoryGirl.attributes_for(:qc, essence: 5)

        expect(@qc.essence).not_to eq(5)

        patch :update, params: { id: @qc.id, qc: @updated_qc_params, format: :json }
        @qc.reload

        expect(@qc.essence).to eq(5)
      end
    end

    context "With invalid attributes" do
      it "Updates qc attributes" do
        request.headers['Authorization'] = authenticated_header(@player)
        @chronicle = FactoryGirl.create(:chronicle)
        @invalid_updated_qc_params = FactoryGirl.attributes_for(:qc, essence: -1)

        expect(@qc.essence).not_to eq(-1)

        patch :update, params: { id: @qc.id, qc: @invalid_updated_qc_params, format: :json }
        @qc.reload

        expect(@qc.essence).not_to eq(-1)
      end
    end

    it_behaves_like "respond_to_unauthenticated", 'update'
  end

end
