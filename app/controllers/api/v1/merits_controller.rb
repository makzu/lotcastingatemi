# frozen_string_literal: true

module Api
  module V1
    class MeritsController < Api::V1::BaseController
      def create
        @character = Character.find(params.expect(:character_id))
        @merit = Merit.new(resource_params)
        @merit.character = @character
        authorize @merit
        if @merit.save
          render json: @merit
        else
          render json: @merit.errors.details, status: :bad_request
        end
      end

      def merit_params
        return if params[:merit].blank?

        params.expect(merit: [*base_attributes, :sorting_position])
      end
    end
  end
end
