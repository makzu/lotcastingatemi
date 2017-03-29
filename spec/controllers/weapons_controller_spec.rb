require 'rails_helper'

RSpec.describe Api::V1::WeaponsController, type: :controller do

  describe "GET #show" do
    it "returns http success" do
      @weapon = FactoryGirl.create(:weapon)

      get :show, params: { character_id: @weapon.character_id, id: @weapon.id, format: :json }

      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    context "With valid attributes" do
      it "Increases Weapon count by 1" do
        @character = FactoryGirl.create(:character)
        @weapon_params = FactoryGirl.attributes_for(:weapon, character_id: @character.id)

        expect { post :create, params: { character_id: @character.id, :weapon => @weapon_params }, format: :json }.to change(Weapon, :count).by(1)
      end
    end

    context "With invalid attributes" do
      it "Increases Weapon count by 0" do
        @character = FactoryGirl.create(:character)
        @invalid_weapon_params = FactoryGirl.attributes_for(:weapon, character_id: "Attribute")

        expect { post :create, params: { character_id: @character.id, :weapon => @invalid_weapon_params }, format: :json }.to change(Weapon, :count).by(0)
      end
    end
  end

  describe "DELETE #destroy" do
    it "Decreases Weapon count by 1" do
      @weapon = FactoryGirl.create(:weapon)

      expect { delete :destroy, params: { character_id: @weapon.character_id, id: @weapon.id, format: :json } }.to change(Weapon, :count).by(-1)
    end
  end

  describe "PATCH #update" do
    context "With valid attributes" do
      it "Updates weapon attributes" do
        @weapon = FactoryGirl.create(:weapon)
        @character = FactoryGirl.create(:character)
        @updated_weapon_params = FactoryGirl.attributes_for(:weapon, character_id: @character.id, weight: "heavy")

        expect(@weapon.weight).to eq("light")

        patch :update, params: { character_id: @character.id, id: @weapon.id, weapon: @updated_weapon_params, format: :json }
        @weapon.reload

        expect(@weapon.weight).to eq("heavy")
      end
    end

    context "With invalid attributes" do
      it "Updates weapon attributes" do
        @weapon = FactoryGirl.create(:weapon)
        @character = FactoryGirl.create(:character)
        @invalid_updated_weapon_params = FactoryGirl.attributes_for(:weapon, character_id: @character.id, weight: "Invalid Weight")

        expect(@weapon.weight).to eq("light")

        patch :update, params: { character_id: @character.id, id: @weapon.id, weapon: @invalid_updated_weapon_params, format: :json }
        @weapon.reload

        expect(@weapon.weight).to eq("light")
      end
    end
  end

end
