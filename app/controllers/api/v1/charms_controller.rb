# frozen_string_literal: true

module Api
  module V1
    class CharmsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_charm, only: %i[show update destroy]

      def show
        authorize @charm
        render json: @charm
      end

      def create
        @character = Character.find(params[:character_id])
        @charm = Charm.create(charm_params)
        @charm.character = @character
        authorize @charm
        render json: @charm
      end

      def destroy
        authorize @charm
        render json: @charm.destroy
      end

      def update
        authorize @charm
        @charm.update_attributes(charm_params)
        render json: @charm
      end

      private

      def set_charm
        @charm = Charm.find(params[:id])
      end

      def charm_params
        params.require(:charm).permit!
      end
    end
  end
end
