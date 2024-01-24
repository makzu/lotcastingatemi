# frozen_string_literal: true

module Api
  module V1
    class PlayersController < Api::V1::BaseController
      skip_before_action :setup_resource, only: %i[destroy]

      # Show the currently logged-in player
      def index
        authorize current_player
        render json: PlayerSerializer.one(current_player)
      end

      # Players do not have a show action
      def show
        head :not_found
      end

      # Players do not have a create action
      def create
        head :forbidden
      end

      def destroy
        authorize current_player
        render json: current_player.destroy
      end

      private

      def player_params
        params.require(:player).permit(:display_name)
      end
    end
  end
end
