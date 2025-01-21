# frozen_string_literal: true

module Api
  module V1
    class CharmLoadoutssController < Api::V1::BaseController
      def create
        @character = Character.find(params[:character_id])
        @loadout = CharmLoadout.new(resource_params)
        @loadout.character = @character
        authorize @loadout
        if @loadout.save
          render json: @loadout
        else
          render json: @loadout.errors.details, status: :bad_request
        end
      end

      def add_charm
        @loadout = CharmLoadout.find(params[:id])
        authorize @loadout
        @charm = Charm.find(params[:charm_id])
        @loadout.charms << @charm
        render json: @loadout
      end

      def remove_charm
        @loadout = CharmLoadout.find(params[:id])
        authorize @loadout
        @charm = Charm.find(params[:charm_id])
        @loadout.charms.delete(@charm)
        render json: @loadout
      end

      def charm_params
        params.require(:charm_loadout).permit(*base_attributes, :sorting_position, keywords: [], categories: [])
      end
    end
  end
end
