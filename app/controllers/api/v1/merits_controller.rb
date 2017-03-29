class Api::V1::MeritsController < Api::V1::BaseController
  def show
    respond_with Merit.find(params[:id])
  end

  def create
    @character = Character.find(params[:character_id])
    respond_with :api, :v1, Merit.create(merit_params), location: api_v1_character_merits_path
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
  def merit_params
    params.require(:merit).permit!
  end
end
