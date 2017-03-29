class Api::V1::WeaponsController < Api::V1::BaseController
  before_action :set_weapon, only: [:show, :update, :destroy]
  
  def show
    respond_with @weapon
  end

  def create
    @character = Character.find(params[:character_id])
    respond_with :api, :v1, Weapon.create(weapon_params), location: api_v1_character_weapons_path
  end

  def destroy
    respond_with @weapon.destroy
  end

  def update
    @weapon.update_attributes(weapon_params)
    respond_with @weapon, json: @weapon
  end

  private
  def set_weapon
    @weapon = Weapon.find(params[:id])
  end

  def weapon_params
    params.require(:weapon).permit!
  end
end
