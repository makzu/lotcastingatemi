# frozen_string_literal: true

module Api
  module V1
    class BattlegroupsController < BaseController
      skip_before_action :authenticate_player, only: :show
      skip_before_action :setup_resource, only: :create_from_qc

      def index
        authorize current_player
        @pagy, @battlegroups = pagy(Battlegroup.includes(:qc_attacks).where(player_id: current_player.id))

        return unless stale? @battlegroups

        render json: BattlegroupSerializer.many(@battlegroups)
      end

      def create
        @battlegroup = Battlegroup.new(resource_params)
        @battlegroup.player ||= current_player
        authorize @battlegroup
        if @battlegroup.save
          render json: BattlegroupSerializer.one(@battlegroup)
        else
          render json: @battlegroup.errors.details, status: :bad_request
        end
      end

      def create_from_qc
        @qc = Qc.find(params[:qc_id])
        authorize @qc, :show?

        @battlegroup = Battlegroup.new_from_qc(@qc)
        @battlegroup.player = current_player

        if @battlegroup.save
          render json: @battlegroup
        else
          render json: @battlegroup.errors.details, status: :bad_request
        end
      end

      def duplicate
        authorize @battlegroup, :show?

        @new_bg = @battlegroup.deep_clone include: %i[
          qc_attacks
        ], except: %i[
          chronicle_id sorting chronicle_sorting pinned hidden public
          in_combat has_acted
        ]

        @new_bg.name = "#{@new_bg.name} (Duplicate)"
        @new_bg.player = current_player

        if @new_bg.save
          render json: @new_bg.reload
        else
          render json: @new_bg.errors.details, status: :bad_request
        end
      end

      def battlegroup_params
        params.require(:battlegroup).permit(
          *base_attributes,
          :sorting_position,
          :chronicle_sorting_position
        )
      end
    end
  end
end
