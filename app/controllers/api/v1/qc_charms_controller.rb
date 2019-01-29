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
        if @qca.save
          render json: @qca
        else
          render json: @qca.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @qc_charm
        render json: @qc_charm.destroy
      end

      def update
        authorize @qc_charm
        if @qc_charm.update(qc_charm_params)
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
        params.require(:qc_charm).permit(QcCharm.attribute_names - disallowed_attributes) if params[:qc_charm].present?
      end
    end
  end
end
