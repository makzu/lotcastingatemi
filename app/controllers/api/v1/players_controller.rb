# frozen_string_literal: true

module Api
  module V1
    class PlayersController < Api::V1::BaseController
      before_action :authenticate_player, except: [:create]
      before_action :set_player, only: [:show]

      # Show the currently logged-in player
      def index
        render json: current_player, include: %w[chronicles.* own_chronicles.* characters.* qcs.* battlegroups.*]
      end

      # Show a single player
      def show
        authorize @player
        render json: @player, include: %w[characters.* qcs.* battlegroups]
      end

      def create
        @player = Player.new(player_params)

        if @player.save
          t = Knock::AuthToken.new payload: { sub: @player.id }
          render json: t, status: :created
        else
          # TODO: error or something?
          render status: :bad_request
        end
      end

      private

      def set_player
        @player = Player.find(params[:id])
      end

      def player_params
        params.require(:player).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
