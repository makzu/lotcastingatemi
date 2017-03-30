require 'rails_helper'

RSpec.describe Api::V1::CharactersController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      @character = FactoryGirl.create(:character)

      get :show, params: { id: @character, format: :json }

      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    context "With valid attributes" do
      it "Increases Character count by 1" do
        @player = FactoryGirl.create(:player)
        @chronicle = FactoryGirl.create(:chronicle)
        @character_params = FactoryGirl.attributes_for(:character, chronicle_id: @chronicle.id, player_id: @player.id)

        expect { post :create, params: { :character => @character_params }, format: :json }.to change(Character, :count).by(1)
      end
    end

    context "With invalid attributes" do
      it "Increases Character count by 0" do
        @player = FactoryGirl.create(:player)
        @chronicle = FactoryGirl.create(:chronicle)
        @invalid_character_params = FactoryGirl.attributes_for(:character, chronicle_id: "Invalid", player_id: "Attribute")

        expect { post :create, params: { :character => @invalid_character_params }, format: :json }.to change(Character, :count).by(0)
      end
    end
  end

  describe "DELETE #destroy" do
    it "Decreases Character count by 1" do
      @character = FactoryGirl.create(:character)

      expect { delete :destroy, params: { id: @character.id, format: :json } }.to change(Character, :count).by(-1)
    end
  end

  describe "PATCH #update" do
    context "With valid attributes" do
      it "Updates character attributes" do
        @player = FactoryGirl.create(:player)
        @chronicle = FactoryGirl.create(:chronicle)
        @character = FactoryGirl.create(:character)
        @updated_character_params = FactoryGirl.attributes_for(:character, chronicle_id: @chronicle.id, player_id: @player.id)

        expect(@character.player_id).not_to eq(@player.id)
        expect(@character.chronicle_id).not_to eq(@chronicle.id)

        patch :update, params: { id: @character.id, character: @updated_character_params, format: :json }
        @character.reload

        expect(@character.player_id).to eq(@player.id)
        expect(@character.chronicle_id).to eq(@chronicle.id)
      end
    end

    context "With invalid attributes" do
      it "Updates character attributes" do
        @player = FactoryGirl.create(:player)
        @chronicle = FactoryGirl.create(:chronicle)
        @character = FactoryGirl.create(:character)
        @invalid_updated_character_params = FactoryGirl.attributes_for(:character, chronicle_id: "Invalid", player_id: "Attribute")

        expect(@character.player_id).not_to eq(@player.id)
        expect(@character.chronicle_id).not_to eq(@chronicle.id)

        patch :update, params: { id: @character.id, character: @invalid_updated_character_params, format: :json }
        @character.reload

        expect(@character.player_id).not_to eq(@player.id)
        expect(@character.chronicle_id).not_to eq(@chronicle.id)
      end
    end
  end
end
