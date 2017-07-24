# frozen_string_literal: true

module Api
  module V1
    class QcCharmsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc_charm, only: %i[show update destroy]

      def show
        authorize @qc_charm
        render json: @qc_charm
      end

      def create
        @qc = Qc.find(params[:qc_id])
        @qca = QcCharm.new(qc_charm_params)
        @qca.qc = @qc
        authorize @qca
        @qca.save
        render json: @qca
      end

      def destroy
        authorize @qc_charm
        render json: @qc_charm.destroy
      end

      def update
        authorize @qc_charm
        if @qc_charm.update_attributes(qc_charm_params)
          render json: @qc_charm
        else
          render json: @qc_charm.errors.details, status: :bad_request
        end
      end

      private

      def set_qc_charm
        @qc_charm = QcCharm.find(params[:id])
      end

      def qc_charm_params
        params.require(:qc_charm).permit!
      end
    end
  end
end
