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
        @charm = Charm.new(charm_params)
        @charm.character = @character
        authorize @charm
        if @charm.save
          render json: @charm
        else
          render json: @charm.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @charm
        render json: @charm.destroy
      end

      def update
        authorize @charm
        if @charm.update_attributes(charm_params)
          render json: @charm
        else
          render json: @charm.errors.details, status: :bad_request
        end
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
