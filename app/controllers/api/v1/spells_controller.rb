# frozen_string_literal: true

module Api
  module V1
    class SpellsController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_spell, only: %i[show update destroy]

      def show
        authorize @spell
        render json: @spell
      end

      def create
        @character = Character.find(params[:character_id])
        @spell = Spell.new(spell_params)
        @spell.character = @character
        authorize @spell
        @spell.save
        render json: @spell
      end

      def destroy
        authorize @spell
        render json: @spell.destroy
      end

      def update
        authorize @spell
        @spell.update_attributes(spell_params)
        render json: @spell
      end

      private

      def set_spell
        @spell = Spell.find(params[:id])
      end

      def spell_params
        params.require(:spell).permit!
      end
    end
  end
end
