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
        if params[:qc_attack].present?
          params.require(:qc_attack).permit(*base_attributes, tags: [])
        end
      end
    end
  end
end
