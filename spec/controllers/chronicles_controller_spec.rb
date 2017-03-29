require 'rails_helper'

RSpec.describe Api::V1::ChroniclesController, type: :controller do

	describe "GET show" do
		it "returns http success" do
			@chronicle = FactoryGirl.create(:chronicle)

			get :show, params: { id: @chronicle.id, format: :json }

			expect(response).to have_http_status(:success)
		end
	end

	describe "POST #create" do
	    context "With valid attributes" do
	      it "Increases Chronicle count by 1" do
	        @player = FactoryGirl.create(:player)
	        @chronicle_params = FactoryGirl.attributes_for(:chronicle, player_id: @player.id)

	        expect { post :create, params: { :chronicle => @chronicle_params }, format: :json }.to change(Chronicle, :count).by(1)
	      end
	    end

	    context "With invalid attributes" do
	      it "Increases Chronicle count by 0" do
	        @player = FactoryGirl.create(:player)
	        @invalid_chronicle_params = FactoryGirl.attributes_for(:chronicle, player_id: "Invalid Attribute")

	        expect { post :create, params: { :chronicle => @invalid_chronicle_params }, format: :json }.to change(Chronicle, :count).by(0)
	      end
	    end
  	end

  	describe "DELETE #destroy" do
	    it "Decreases Chronicle count by 1" do
	      @chronicle = FactoryGirl.create(:chronicle)

	      expect { delete :destroy, params: { id: @chronicle.id, format: :json } }.to change(Chronicle, :count).by(-1)
	    end
  	end

  	describe "PATCH #update" do
	    context "With valid attributes" do
	      it "Updates character attributes" do
	        @player = FactoryGirl.create(:player)
	        @chronicle = FactoryGirl.create(:chronicle)
	        @updated_chronicle_params = FactoryGirl.attributes_for(:chronicle, player_id: @player.id)

	        expect(@chronicle.player_id).not_to eq(@player.id)

	        patch :update, params: { id: @chronicle.id, chronicle: @updated_chronicle_params, format: :json}
	        @chronicle.reload

	        expect(@chronicle.player_id).to eq(@player.id)
	      end
	    end

	    context "With invalid attributes" do
	      it "Updates character attributes" do
	        @player = FactoryGirl.create(:player)
	        @chronicle = FactoryGirl.create(:chronicle)
	        @invalid_updated_chronicle_params = FactoryGirl.attributes_for(:chronicle, player_id: "Invalid Attribute")

	        expect(@chronicle.player_id).not_to eq(@player.id)

	        patch :update, params: { id: @chronicle.id, chronicle: @invalid_updated_chronicle_params, format: :json}
	        @chronicle.reload

	        expect(@chronicle.player_id).not_to eq(@player.id)
	      end
	    end
  	end
end
