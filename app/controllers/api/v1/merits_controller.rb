class Api::V1::MeritsController < Api::V1::BaseController
  def index
    respond_with Character.find(params[:character_id]).merits
  end

  def show
    respond_with Merit.find(params[:id])
  end

  def create
    respond_with :api, :v1, Merit.create(merit_params)
  end

  def destroy
    respond_with Merit.destroy(params[:id])
  end

  def update
    merit = Merit.find(params[:id])
    merit.update_attributes(merit_params)
    respond_with merit, json: merit
  end

  private
end
