# frozen_string_literal: true

module Api
  module V1
    class CharactersController < BaseController
      skip_before_action :authenticate_player, only: :show

      def index
        authorize current_player

        @pagy, @characters = pagy(Character.includes(Character.association_types).where(player_id: current_player.id))

        return unless stale? @characters

        render json: @characters
      end

      def show
        authorize @character

        if policy(@character).update?
          render json: @character
        else
          render json: @character.without_secrets
        end
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
          martial_arts_charms weapons merits spirit_charms spells
        ], except: %i[
          chronicle_id sort_order chronicle_sort_order pinned hidden public
          in_combat has_acted
        ]

        @new_character.name = "#{@new_character.name} (Duplicate)"
        @new_character.player = current_player

        if @new_character.save
          render json: @new_character.reload
        else
          render json: @new_character.error.details, status: :bad_request
        end
      end

      def change_type
        authorize @character, :update?
        @new_type = Character.character_types.find do |type|
          type == params[:type]
        end
        raise 'Unavailable type' if @new_type.nil?

        @new_type = @new_type.constantize

        @new_character = @new_type.from_character!(@character)

        if @new_character.save
          render json: @new_character
        else
          render json: @new_character.errors.details, status: :bad_request
        end
      rescue StandardError => e
        render json: { error: e.message }, status: :bad_request
      end

      # rubocop:disable Metrics/MethodLength
      def character_params
        params.require(:character).permit(
          *base_attributes,
          ties:               [Schemas::INTIMACY_PARAMS],
          principles:         [Schemas::INTIMACY_PARAMS],
          motes_committed:    [Schemas::MOTE_COMMITTMENT_PARAMS],
          abil_craft:         [Schemas::CRAFT_PARAMS],
          abil_martial_arts:  [Schemas::MARTIAL_ARTS_PARAMS],
          specialties:        [Schemas::SPECIALTY_PARAMS],
          resources:          [Schemas::RESOURCE_PARAMS],
          xp_log:             [Schemas::XP_LOG_PARAMS],
          xp_log_solar:       [Schemas::XP_LOG_PARAMS],
          bp_log:             [Schemas::XP_LOG_PARAMS],
          forms:              [Schemas::FORM_PARAMS],
          caste_attributes:   [],
          favored_attributes: [],
          caste_abilities:    [],
          favored_abilities:  [],
          excellencies_for:   [],
          rituals:            [],
          anima_powers:       [],
          armor_tags:         []
        )
      end
      # rubocop:enable Metrics/MethodLength
    end
  end
end
