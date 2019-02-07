# frozen_string_literal: true

module Api
  module V1
    class WeaponsController < Api::V1::BaseController
      def create
        @character = Character.find(params[:character_id])
        @weapon = Weapon.new(resource_params)
        @weapon.character = @character
        authorize @weapon
        if @weapon.save
          render json: @weapon
        else
          render json: @weapon.errors.details, status: :bad_request
        end
      end

      def weapon_params
        params.require(:weapon).permit(*base_attributes, tags: []) if params[:weapon].present?
      end
    end
  end
end
