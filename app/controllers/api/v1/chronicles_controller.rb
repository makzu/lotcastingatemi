# frozen_string_literal: true

module Api
  module V1
    class ChroniclesController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_chronicle, only: %i[show update destroy]

      def show
        render json: @chronicle.as_json(include: {
          st: { only: %i[name id] },
          players: { only: %i[name id] },
          characters: { include: %i[weapons merits] },
          qcs: { include: %i[qc_attacks qc_merits] }
        })
      end

      def create
        render json: Chronicle.create(chronicle_params)
      end

      def destroy
        render json: @chronicle.destroy
      end

      def update
        @chronicle.update_attributes(chronicle_params)
        render json: @chronicle
      end

      private

      def set_chronicle
        @chronicle = Chronicle.find(params[:id])
      end

      def chronicle_params
        params.require(:chronicle).permit!
      end
    end
  end
end
