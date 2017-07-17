# frozen_string_literal: true

module Api
  module V1
    class MeritsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_merit, only: %i[show update destroy]

      def show
        authorize @merit
        render json: @merit
      end

      def create
        @character = Character.find(params[:character_id])
        @merit = Merit.new(merit_params)
        @merit.character = @character
        authorize @merit
        @merit.save
        render json: @merit
      end

      def destroy
        authorize @merit
        render json: @merit.destroy
      end

      def update
        authorize @merit
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
  end
end
