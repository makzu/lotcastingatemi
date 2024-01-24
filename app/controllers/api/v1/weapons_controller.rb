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
          render json: WeaponSerializer.one(@weapon)
        else
          render json: @weapon.errors.details, status: :bad_request
        end
      end

      def weapon_params
        return if params[:weapon].blank?

        params.require(:weapon).permit(
          *base_attributes,
          :sorting_position,
          tags:      [],
          overrides: {
            attack_attribute:  %i[use base_only],
            defense_attribute: %i[use base_only],
            damage_attribute:  %i[use base_only]
          }
        )
      end
    end
  end
end
