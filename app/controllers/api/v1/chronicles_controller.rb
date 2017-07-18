# frozen_string_literal: true

module Api
  module V1
    class ChroniclesController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_chronicle, only: %i[show update destroy]
      serialization_scope :current_player

      def show
        authorize @chronicle
        render json: @chronicle, include: %w[chronicles.* own_chronicles.* characters.* qcs.* battlegroups.*]
      end

      def create
        render json: Chronicle.create(chronicle_params)
      end

      def destroy
        authorize @chronicle
        render json: @chronicle.destroy
      end

      def update
        authorize @chronicle
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
