# frozen_string_literal: true

module Api
  module V1
    class PlayersController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_player, only: %i[show update]

      # Show the currently logged-in player
      def index
        authorize current_player
        render json: current_player, include: %w[chronicles.* own_chronicles.* characters.* qcs.* battlegroups.*]
      end

      # Show a single player
      def show
        authorize @player
        render json: @player, include: %w[characters.* qcs.* battlegroups]
      end

      def update
        authorize @player
        if @player.update_attributes(player_params)
          render json: @player
        else
          render json: @player.errors.details, status: :bad_request
        end
      end

      private

      def set_player
        @player = Player.find(params[:id])
      end

      def player_params
        params.require(:player).permit(:display_name)
      end
    end
  end
end
