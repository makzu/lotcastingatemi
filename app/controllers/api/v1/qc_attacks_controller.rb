# frozen_string_literal: true

module Api
  module V1
    class QcAttacksController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc_attack, only: %i[show update destroy]

      def show
        authorize @qc_attack
        render json: @qc_attack
      end

      def create
        @qc = Qc.find(params[:qc_id])
        @qca = QcAttack.create(qc_attack_params)
        @qca.qc = @qc
        authorize @qca
        render json: @qca
      end

      def destroy
        authorize @qc_attack
        render json: @qc_attack.destroy
      end

      def update
        authorize @qc_attack
        @qc_attack.update_attributes(qc_attack_params)
        render json: @qc_attack
      end

      private

      def set_qc_attack
        @qc_attack = QcAttack.find(params[:id])
      end

      def qc_attack_params
        params.require(:qc_attack).permit!
      end
    end
  end
end
