class Api::V1::CharactersController < Api::V1::BaseController
  before_action :set_character, only: [:show, :update, :destroy]

  #def index
    #respond_with Character.all
  #end

  def show
    included = %w{merits weapons armors}
    render json: @character, include: included
  end

  def create
    respond_with :api, :v1, Character.create(character_params)
  end

  def destroy
    @character.destroy
  end

  def update
    #byebug
    @character.update_attributes(character_params)
    render json: @character
  end

  private
  def set_character
    @character = Character.find(params[:id])
  end

  def character_params
    #params.require(:character).permit(:name, :merit, :weapon, :armor)
    params.require(:character).permit!
  end
end
