class Api::V1::WeaponsController < Api::V1::BaseController
  before_action :set_weapon, only: [:show, :update, :destroy]

  def show
    respond_with @weapon
  end

  def create
    render json: Weapon.create(weapon_params)
  end

  def destroy
    render json: @weapon.destroy
  end

  def update
    @weapon.update_attributes(weapon_params)
    render json: @weapon
  end

  private
  def set_weapon
    @weapon = Weapon.find(params[:id])
  end

  def weapon_params
    params.require(:weapon).permit!
  end
end
