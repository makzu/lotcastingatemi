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
        if @spell.save
          render json: @spell
        else
          render json: @spell.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @spell
        render json: @spell.destroy
      end

      def update
        authorize @spell
        if @spell.update(spell_params)
          render json: @spell
        else
          render json: @spell.errors.details, status: :bad_request
        end
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
