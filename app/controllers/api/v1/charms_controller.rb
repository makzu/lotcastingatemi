# frozen_string_literal: true

module Api
  module V1
    class CharmsController < Api::V1::BaseController
      def create
        @character = Character.find(params[:character_id])
        @charm = Charm.new(resource_params)
        @charm.character = @character
        authorize @charm
        if @charm.save
          render json: @charm
        else
          render json: @charm.errors.details, status: :bad_request
        end
      end

      def charm_params
        params.require(:charm).permit(
          *base_attributes,
          :sorting_position,
          keywords:   [],
          categories: [],
          loadouts:   []
        )
      end
    end
  end
end
