# frozen_string_literal: true

module Api
  module V1
    class QcMeritsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc_merit, only: %i[show update destroy]

      def show
        authorize @qc_merit
        render json: @qc_merit
      end

      def create
        @qc = Qc.find(params[:qc_id])
        @qcm = QcMerit.new(qc_merit_params)
        @qcm.qc = @qc
        authorize @qcm
        @qcm.save
        render json: @qcm
      end

      def destroy
        authorize @qc_merit
        render json: @qc_merit.destroy
      end

      def update
        authorize @qc_merit
        if @qc_merit.update_attributes(qc_merit_params)
          render json: @qc_merit
        else
          render json: @qc_merit.errors.details, status: :bad_request
        end
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
