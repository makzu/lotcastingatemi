# frozen_string_literal: true

module Api
  module V1
    class QcsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc, only: %i[show update destroy]

      def show
        authorize @qc
        render json: @qc.as_json(include: %i[qc_attacks qc_merits])
      end

      def create
        render json: Qc.create(qc_params).as_json(include: %i[qc_attacks qc_merits])
      end

      def destroy
        authorize @qc
        render json: @qc.destroy
      end

      def update
        authorize @qc
        if @qc.update_attributes(qc_params)
          render json: @qc
        else
          render json: @qc.errors.details, status: :bad_request
        end
      end

      private

      def set_qc
        @qc = Qc.find(params[:id])
      end

      def qc_params
        params.require(:qc).permit!
      end
    end
  end
end
