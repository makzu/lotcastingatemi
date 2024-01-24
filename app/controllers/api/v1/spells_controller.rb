# frozen_string_literal: true

module Api
  module V1
    class SpellsController < Api::V1::BaseController
      before_action :set_parent, only: :create

      def create
        @spell = Spell.new(resource_params)
        @spell.sorcerer = @parent
        authorize @spell
        if @spell.save
          render json: SpellSerializer.one(@spell)
        else
          render json: @spell.errors.details, status: :bad_request
        end
      end

      def spell_params
        return if params[:spell].blank?

        params.require(:spell).permit(*base_attributes, :sorting_position, keywords: [], categories: [])
      end
    end
  end
end
