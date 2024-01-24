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
          render json: QcAttackSerializer.one(@qca)
        else
          render json: @qca.errors.details, status: :bad_request
        end
      end

      def qc_attack_params
        return if params[:qc_attack].blank?

        params.require(:qc_attack).permit(*base_attributes, :sorting_position, tags: [])
      end
    end
  end
end
