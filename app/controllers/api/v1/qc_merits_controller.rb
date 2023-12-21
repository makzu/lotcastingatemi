# frozen_string_literal: true

module Api
  module V1
    class QcMeritsController < Api::V1::BaseController
      def create
        @qc = Qc.find(params[:qc_id])
        @qcm = QcMerit.new(qc_merit_params)
        @qcm.qc = @qc
        authorize @qcm
        if @qcm.save
          render json: @qcm
        else
          render json: @qcm.errors.details, status: :bad_request
        end
      end

      def qc_merit_params
        return if params[:qc_merit].blank?

        params.require(:qc_merit).permit(*base_attributes, :sorting_position, keywords: [])
      end
    end
  end
end
