class Api::V1::MeritsController < Api::V1::BaseController
  before_action :set_merit, only: [:show, :update, :destroy]

  def show
    render json: @merit
  end

  def create
<<<<<<< HEAD
    @character = Character.find(params[:character_id])
    respond_with :api, :v1, Merit.create(merit_params), location: api_v1_character_merits_path
=======
    render json: Merit.create(merit_params)
>>>>>>> afd2bd39e921b2fa0f9239dc5faec35e9db0c8a4
  end

  def destroy
    render json: @merit.destroy
  end

  def update
    @merit.update_attributes(merit_params)
    render json: @merit
  end

  private
  def set_merit
    @merit = Merit.find(params[:id])
  end

  def merit_params
    params.require(:merit).permit!
  end
end
