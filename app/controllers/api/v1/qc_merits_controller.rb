# frozen_string_literal: true

module Api
  module V1
    class QcMeritsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc_merit, only: %i[show update destroy]

      def show
        render json: @qc_merit
      end

      def create
        render json: QcMerit.create(qc_merit_params)
      end

      def destroy
        render json: @qc_merit.destroy
      end

      def update
        @qc_merit.update_attributes(qc_merit_params)
        render json: @qc_merit
      end

      private

      def set_qc_merit
        @qc_merit = QcMerit.find(params[:id])
      end

      def qc_merit_params
        params.require(:qc_merit).permit!
      end
    end
  end
end
