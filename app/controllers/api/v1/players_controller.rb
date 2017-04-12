# frozen_string_literal: true

module Api
  module V1
    class PlayersController < Api::V1::BaseController
      before_action :authenticate_player, except: [:create]
      before_action :set_player, only: [:show]

      def show
        render json: @player.as_json(include: {
          characters: { include: %i[weapons merits] },
          qcs: { include: %i[qc_attacks qc_merits] }
        })
      end

      private

      def set_player
        @player = Player.find(params[:id])
      end
    end
  end
end
