# frozen_string_literal: true

module Api
  module V1
    class CombatActorsController < BaseController
      skip_before_action :authenticate_player, only: :show
      before_action :set_parent, only: :create

      def create
        @combat_actor = CombatActor.new(resource_params)
        @combat_actor.player ||= current_player
        authorize @combat_actor
        @combat_actor.actor = @parent

        if @combat_actor.save
          render json: @combat_actor
        else
          render json: @combat_actor.errors.details, status: :bad_request
        end
      end

      private

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
