# frozen_string_literal: true

module Api
  module V1
    class QcAttacksController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_qc_attack, only: %i[show update destroy]
      before_action :set_parent, only: :create

      def show
        authorize @qc_attack
        render json: @qc_attack
      end

      def create
        @qca = QcAttack.new(qc_attack_params)
        @qca.qc_attackable = @parent
        authorize @qca
        if @qca.save
          render json: @qca
        else
          render json: @qca.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @qc_attack
        render json: @qc_attack.destroy
      end

      def update
        authorize @qc_attack
        if @qc_attack.update_attributes(qc_attack_params)
          render json: @qc_attack
        else
          render json: @qc_attack.errors.details, status: :bad_request
        end
      end

      private

      def set_qc_attack
        @qc_attack = QcAttack.find(params[:id])
      end

      def qc_attack_params
        params.require(:qc_attack).permit!
      end

      def set_parent
        if params[:qc_id]
          @parent = Qc.find(params[:qc_id])
        elsif params[:battlegroup_id]
          @parent = Battlegroup.find(params[:battlegroup_id])
        end
      end
    end
  end
end
