# frozen_string_literal: true

module Api
  module V1
    class CharactersController < BaseController
      before_action :authenticate_player
      before_action :set_character, only: %i[show update destroy]

      def show
        included = %w[merits weapons]
        render json: @character, include: included
      end

      def create
        render json: Character.create(character_params)
      end

      def destroy
        render json: @character.destroy
      end

      def update
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
