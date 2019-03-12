# frozen_string_literal: true

module Api
  module V1
    class PoisonsController < Api::V1::BaseController
      before_action :set_parent, only: :create

      def create
        @poison = Poison.new(resource_params)
        @poison.poisonable = @parent
        authorize @poison
        if @poison.save
          render json: @poison
        else
          render json: @poison.errors.details, status: :bad_request
        end
      end
    end
  end
end
