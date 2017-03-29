require 'rails_helper'

RSpec.describe Api::V1::MeritsController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      @merit = FactoryGirl.create(:merit)

      get :show, params: { character_id: @merit.character_id, id: @merit.id, format: :json }

      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    context "With valid attributes" do
      it "Increases merit count by 1" do
        @character = FactoryGirl.create(:character)
        @merit_params = FactoryGirl.attributes_for(:merit, character_id: @character.id)

        expect { post :create, params: { character_id: @character.id, :merit => @merit_params }, format: :json }.to change(Merit, :count).by(1)
      end
    end

    context "With invalid attributes" do
      it "Increases merit count by 0" do
        @character = FactoryGirl.create(:character)
        @invalid_merit_params = FactoryGirl.attributes_for(:merit, character_id: "Attribute")

        expect { post :create, params: { character_id: @character.id, :merit => @invalid_merit_params }, format: :json }.to change(Merit, :count).by(0)
      end
    end
  end

  describe "DELETE #destroy" do
    it "Decreases merit count by 1" do
      @merit = FactoryGirl.create(:merit)

      expect { delete :destroy, params: { character_id: @merit.character_id, id: @merit.id, format: :json } }.to change(Merit, :count).by(-1)
    end
  end

  describe "PATCH #update" do
    context "With valid attributes" do
      it "Updates merit attributes" do
        @merit = FactoryGirl.create(:merit)
        @character = FactoryGirl.create(:character)
        @updated_merit_params = FactoryGirl.attributes_for(:merit, character_id: @character.id, merit_cat: "innate")

        expect(@merit.merit_cat).to eq("story")

        patch :update, params: { character_id: @character.id, id: @merit.id, merit: @updated_merit_params, format: :json }
        @merit.reload

        expect(@merit.merit_cat).to eq("innate")
      end
    end

    context "With invalid attributes" do
      it "Updates merit attributes" do
        @merit = FactoryGirl.create(:merit)
        @character = FactoryGirl.create(:character)
        @invalid_updated_merit_params = FactoryGirl.attributes_for(:merit, character_id: @character.id, merit_cat: "Invalid merit_cat")

        expect(@merit.merit_cat).to eq("story")

        patch :update, params: { character_id: @character.id, id: @merit.id, merit: @invalid_updated_merit_params, format: :json }
        @merit.reload

        expect(@merit.merit_cat).to eq("story")
      end
    end
  end

end