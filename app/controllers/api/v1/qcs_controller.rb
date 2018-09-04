# frozen_string_literal: true

module Api
  module V1
    class QcsController < Api::V1::BaseController
      before_action :authenticate_player, except: :show
      before_action :set_qc, only: %i[show update destroy duplicate]

      def show
        authorize @qc
        render json: @qc
      end

      def create
        @qc = Qc.new(qc_params)
        @qc.player ||= current_player
        authorize @qc
        if @qc.save
          render json: @qc
        else
          render json: @qc.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @qc
        render json: @qc.destroy
      end

      def update
        authorize @qc
        if @qc.update(qc_params)
          render json: @qc, include: []
        else
          render json: @qc.errors.details, status: :bad_request
        end
      end

      def duplicate
        authorize @qc, :show?

        @new_qc = @qc.deep_clone include: %i[qc_attacks qc_charms qc_merits],
                                 except: %i[chronicle_id sort_order chronicle_sort_order pinned hidden public]

        @new_qc.name = @new_qc.name + ' (Duplicate)'
        @new_qc.player = current_player

        if @new_qc.save
          render json: @new_qc.reload
        else
          render json @new_qc.errors.details, status: :bad_request
        end
      end

      private

      def set_qc
        @qc = Qc.find(params[:id])
      end

      def qc_params
        params.require(:qc).permit!
      end
    end
  end
end
