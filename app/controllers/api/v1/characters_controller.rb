# frozen_string_literal: true

module Api
  module V1
    class CharactersController < BaseController
      skip_before_action :authenticate_player, only: :show

      def index
        authorize current_player
        @characters = Character.includes(Character.association_types).where(player_id: current_player.id)
        render json: @characters
      end

      def create
        @character = Character.new(resource_params)
        @character.player ||= current_player
        authorize @character
        if @character.save
          render json: @character
        else
          render json: @character.errors.details, status: :bad_request
        end
      end

      def duplicate
        authorize @character, :show?

        @new_character = @character.deep_clone include: %i[
          attribute_charms ability_charms essence_charms evocations
          martial_arts_charms weapons merits spirit_charms spells poisons
        ], except: %i[
          chronicle_id sort_order chronicle_sort_order pinned hidden public
          in_combat has_acted
        ]

        @new_character.name = @new_character.name + ' (Duplicate)'
        @new_character.player = current_player

        if @new_character.save
          render json: @new_character.reload
        else
          render json: @new_character.error.details, status: :bad_request
        end
      end

      def change_type
        authorize @character, :update?
        @new_type = params[:type].constantize

        @new_character = @new_type.from_character!(@character)

        if @new_character.save
          render json: @new_character
        else
          render json: @new_character.errors.details, status: :bad_request
        end
      rescue NameError => e
        render json: { error: e.message }, status: :bad_request
      end
    end
  end
end
