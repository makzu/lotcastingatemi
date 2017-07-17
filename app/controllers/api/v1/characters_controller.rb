# frozen_string_literal: true

module Api
  module V1
    class CharactersController < BaseController
      before_action :authenticate_player
      before_action :set_character, only: %i[show update destroy]

      def show
        authorize @character
        render json: @character
      end

      def create
        render json: Character.create(character_params)
      end

      def destroy
        authorize @character
        render json: @character.destroy
      end

      def update
        authorize @character
        @character.update_attributes(character_params)
        render json: @character
      end

      private

      def set_character
        @character = Character.find(params[:id])
      end

      def character_params
        params.require(:character).permit!
      end
    end
  end
end
