# frozen_string_literal: true

module Api
  module V1
    class QcCharmsController < Api::V1::BaseController
      def create
        @qc = Qc.find(params[:qc_id])
        @qca = QcCharm.new(qc_charm_params)
        @qca.qc = @qc
        authorize @qca
        if @qca.save
          render json: @qca
        else
          render json: @qca.errors.details, status: :bad_request
        end
      end

      def qc_charm_params
        return if params[:qc_charm].blank?

        params.require(:qc_charm).permit(*base_attributes, keywords: [])
      end
    end
  end
end
