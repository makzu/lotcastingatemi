class Api::V1::WeaponsController < Api::V1::BaseController
  before_action :set_weapon, only: [:show, :update, :destroy]
  
  def show
  end

  def create
<<<<<<< HEAD
    @character = Character.find(params[:character_id])
    respond_with :api, :v1, Weapon.create(weapon_params), location: api_v1_character_weapons_path
  end

  def destroy
    respond_with @weapon.destroy
=======
    render json: Weapon.create(weapon_params)
  end

  def destroy
    render json: @weapon.destroy
>>>>>>> afd2bd39e921b2fa0f9239dc5faec35e9db0c8a4
  end

  def update
    @weapon.update_attributes(weapon_params)
<<<<<<< HEAD
    respond_with @weapon, json: @weapon
=======
    render json: @weapon
>>>>>>> afd2bd39e921b2fa0f9239dc5faec35e9db0c8a4
  end

  private
  def set_weapon
    @weapon = Weapon.find(params[:id])
  end

  def weapon_params
    params.require(:weapon).permit!
  end
end
