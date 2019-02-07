# frozen_string_literal: true

module Api
  module V1
    class QcAttacksController < Api::V1::BaseController
      before_action :set_parent, only: :create

      def create
        @qca = QcAttack.new(resource_params)
        @qca.qc_attackable = @parent
        authorize @qca
        if @qca.save
          render json: @qca
        else
          render json: @qca.errors.details, status: :bad_request
        end
      end

      def qc_attack_params
        params.require(:qc_attack).permit(*base_attributes, tags: []) if params[:qc_attack].present?
      end

      private

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
