# frozen_string_literal: true

module Api
  module V1
    class QcsController < Api::V1::BaseController
      skip_before_action :authenticate_player, only: :show

      def index
        authorize current_player

        @pagy, @qcs = pagy(current_player.qcs.rank(:sorting)

        return unless stale? @qcs

        render json: @qcs
      end

      def show
        authorize @qc

        if policy(@qc).update?
          render json: @qc
        else
          render json: @qc.without_secrets
        end
      end

      def create
        @qc = Qc.new(resource_params)
        @qc.player ||= current_player
        authorize @qc
        if @qc.save
          render json: @qc
        else
          render json: @qc.errors.details, status: :bad_request
        end
      end

      def duplicate
        authorize @qc, :show?

        @new_qc = @qc.deep_clone include: %i[
          qc_attacks qc_charms qc_merits poisons
        ], except: %i[
          chronicle_id sorting chronicle_sorting pinned hidden public
          in_combat has_acted
        ]

        @new_qc.name = "#{@new_qc.name} (Duplicate)"
        @new_qc.player = current_player

        if @new_qc.save
          render json: @new_qc.reload
        else
          render json: @new_qc.errors.details, status: :bad_request
        end
      end

      def qc_params
        params.require(:qc).permit(
          *base_attributes,
          :sorting_position,
          :chronicle_sorting_position,
          ties:            [Schemas::INTIMACY_PARAMS],
          principles:      [Schemas::INTIMACY_PARAMS],
          actions:         [Schemas::QC_ACTION_PARAMS],
          motes_committed: [Schemas::MOTE_COMMITTMENT_PARAMS],
          resources:       [Schemas::RESOURCE_PARAMS],
          categories:      [],
          rituals:         []
        )
      end
    end
  end
end
