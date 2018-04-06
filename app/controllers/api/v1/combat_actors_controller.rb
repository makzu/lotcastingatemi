# frozen_string_literal: true

module Api
  module V1
    class CombatActorsController < BaseController
      before_action :authenticate_player, except: :show
      before_action :set_combat_actor, only: %i[show update destroy]
      before_action :set_parent, only: :create

      def show
        authorize @combat_actor
        render json: @combat_actor
      end

      def create
        @combat_actor = CombatActor.new(combat_actor_params)
        @combat_actor.player ||= current_player
        authorize @combat_actor
        @combat_actor.actor = @parent

        if @combat_actor.save
          render json: @combat_actor
        else
          render json: @combat_actor.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @combat_actor
        render json: @combat_actor.destroy
      end

      def update
        authorize @combat_actor
        if @combat_actor.update(combat_actor_params)
          render json: @combat_actor
        else
          render json: @combat_actor.errors.details, status: :bad_request
        end
      end

      private

      def set_combat_actor
        @combat_actor = CombatActor.find(params[:id])
      end

      def combat_actor_params
        params.require(:combat_actor).permit!
      end

      def set_parent
        if params[:qc_id]
          @parent = Qc.find(params[:qc_id])
        elsif params[:battlegroup_id]
          @parent = Battlegroup.find(params[:battlegroup_id])
        end
      end
    end
  end
end
