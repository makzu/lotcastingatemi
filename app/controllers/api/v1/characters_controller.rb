# frozen_string_literal: true

module Api
  module V1
    class CharactersController < BaseController
      before_action :authenticate_player, except: :show
      before_action :set_character, only: %i[show update destroy duplicate]

      def show
        authorize @character
        render json: @character
      end

      def create
        @character = Character.new(character_params)
        @character.player ||= current_player
        authorize @character
        if @character.save
          render json: @character
        else
          render json: @character.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @character
        render json: @character.destroy
      end

      def update
        authorize @character
        if @character.update(character_params)
          render json: @character, include: []
        else
          render json: @character.errors.details, status: :bad_request
        end
      end

      def duplicate
        authorize @character, :show?

        @new_character = @character.deep_clone include: %i[attribute_charms ability_charms essence_charms weapons merits evocations martial_arts_charms spirit_charms spells],
                                               except: %i[chronicle_id sort_order chronicle_sort_order pinned hidden public]

        @new_character.name = @new_character.name + ' (Duplicate)'
        @new_character.player = current_player

        if @new_character.save
          render json: @new_character.reload
        else
          render json: @new_character.error.details, status: :bad_request
        end
      end

      private

      def set_character
        @character = Character.find(params[:id])
      end

      def character_params
        params.require(:character).permit!
      end
    end
  end
end
