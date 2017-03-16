class Api::V1::WeaponsController < Api::V1::BaseController
  def index
    respond_with Character.find(params[:character_id]).weapons
  end

  def show
    respond_with Weapon.find(params[:id])
  end

  def create
    respond_with :api, :v1, Weapon.create(weapon_params)
  end

  def destroy
    respond_with Weapon.destroy(params[:id])
  end

  def update
    weapon = Weapon.find(params[:id])
    weapon.update_attributes(weapon_params)
    respond_with weapon, json: weapon
  end

  private
  def weapon_params
    params.require(:weapon).permit!
  end
end
