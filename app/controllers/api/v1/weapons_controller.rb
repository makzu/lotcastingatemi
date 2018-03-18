# frozen_string_literal: true

module Api
  module V1
    class WeaponsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_weapon, only: %i[show update destroy]

      def show
        authorize @weapon
        render json: @weapon
      end

      def create
        @character = Character.find(params[:character_id])
        @weapon = Weapon.new(weapon_params)
        @weapon.character = @character
        authorize @weapon
        if @weapon.save
          render json: @weapon
        else
          render json: @weapon.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @weapon
        render json: @weapon.destroy
      end

      def update
        authorize @weapon
        if @weapon.update(weapon_params)
          render json: @weapon
        else
          render json: @weapon.errors.details, status: :bad_request
        end
      end

      private

      def set_weapon
        @weapon = Weapon.find(params[:id])
      end

      def weapon_params
        params.require(:weapon).permit!
      end
    end
  end
end
