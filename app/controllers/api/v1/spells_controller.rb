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
          render json: @spell
        else
          render json: @spell.errors.details, status: :bad_request
        end
      end

      def spell_params
        params.require(:spell).permit(*base_attributes, keywords: [], categories: []) if params[:spell].present?
      end
    end
  end
end
