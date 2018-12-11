# frozen_string_literal: true

module Api
  module V1
    class PlayersController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_player, only: %i[show update]

      # Show the currently logged-in player
      def index
        authorize current_player
        render json:    Player.includes(include_hash).find(current_player.id),
               include: %w[chronicles.* own_chronicles.* characters.* qcs.* battlegroups.*]
      end

      # Show a single player
      def show
        authorize @player
        render json: @player, include: %w[characters.* qcs.* battlegroups.*]
      end

      def update
        authorize @player
        if @player.update(player_params)
          render json: @player, include: []
        else
          render json: @player.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize current_player
        render json: current_player.destroy
      end

      private

      def set_player
        @player = Player.includes(include_hash).find(params[:id])
      end

      def player_params
        params.require(:player).permit(:display_name)
      end

      def include_hash
        {
          characters:     Character.association_types,
          qcs:            %i[qc_attacks qc_merits qc_attacks qc_charms poisons],
          battlegroups:   %i[qc_attacks poisons],
          chronicles:     [],
          own_chronicles: []
        }
      end
    end
  end
end
