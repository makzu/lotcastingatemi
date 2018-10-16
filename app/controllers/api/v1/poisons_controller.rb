# frozen_string_literal: true

module Api
  module V1
    class PoisonsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_poison, only: %i[show update destroy]
      before_action :set_parent, only: :create

      def show
        authorize @poison
        render json: @poison
      end

      def create
        @poison = Poison.new(poison_params)
        @poison.poisonable = @parent
        authorize @poison
        if @poison.save
          render json: @poison
        else
          render json: @poison.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @poison
        render json: @poison.destroy
      end

      def update
        authorize @poison
        if @poison.update(poison_params)
          render json: @poison
        else
          render json: @poison.errors.details, status: :bad_request
        end
      end

      private

      def set_poison
        @poison = Poison.find(params[:id])
      end

      def poison_params
        params.require(:poison).permit!
      end

      def set_parent
        if params[:character_id]
          @parent = Character.find(params[:character_id])
        elsif params[:qc_id]
          @parent = Qc.find(params[:qc_id])
        elsif params[:battlegroup_id]
          @parent = Battlegroup.find(params[:battlegroup_id])
        elsif params[:combat_actor_id]
          @parent = CombatActor.find(params[:combat_actor_id])
        end
      end
    end
  end
end
