# frozen_string_literal: true

module Api
  module V1
    class WeaponsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_weapon, only: %i[show update destroy]

      def show
        render json: @weapon
      end

      def create
        @character = Character.find(params[:character_id])
        render json: Weapon.create(weapon_params)
      end

      def destroy
        render json: @weapon.destroy
      end

      def update
        @weapon.update_attributes(weapon_params)
        render json: @weapon
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
