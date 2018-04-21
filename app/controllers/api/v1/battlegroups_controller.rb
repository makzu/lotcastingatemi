# frozen_string_literal: true

module Api
  module V1
    class BattlegroupsController < BaseController
      before_action :authenticate_player, except: :show
      before_action :set_battlegroup, only: %i[show update destroy]

      def show
        authorize @battlegroup
        render json: @battlegroup
      end

      def create
        @battlegroup = Battlegroup.new(battlegroup_params)
        @battlegroup.player ||= current_player
        authorize @battlegroup
        if @battlegroup.save
          render json: @battlegroup
        else
          render json: @battlegroup.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @battlegroup
        render json: @battlegroup.destroy
      end

      def update
        authorize @battlegroup
        if @battlegroup.update(battlegroup_params)
          render json: @battlegroup, include: []
        else
          render json: @battlegroup.errors.details, status: :bad_request
        end
      end

      private

      def set_battlegroup
        @battlegroup = Battlegroup.find(params[:id])
      end

      def battlegroup_params
        params.require(:battlegroup).permit!
      end
    end
  end
end
