class Api::V1::ArmorsController < Api::V1::BaseController
  def index
    respond_with Character.find(params[:character_id]).armors
  end

  def show
    respond_with Armor.find(params[:id])
  end

  def create
    respond_with :api, :v1, Armor.create(armor_params)
  end

  def destroy
    respond_with Armor.destroy(params[:id])
  end

  def update
    armor = Armor.find(params[:id])
    armor.update_attributes(armor_params)
    respond_with armor, json: armor
  end

  private
end
