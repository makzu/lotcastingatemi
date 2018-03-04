# frozen_string_literal: true

module Api
  module V1
    class ChroniclesController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_chronicle, only: %i[show update regen_token destroy]
      before_action :set_chronicle_from_token, only: %i[join]
      serialization_scope :current_player

      def show
        authorize @chronicle
        render json: @chronicle
      end

      def create
        @chronicle = Chronicle.new(chronicle_params)
        @chronicle.st ||= current_player
        authorize @chronicle

        if @chronicle.save
          render json: @chronicle
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def regen_token
        authorize @chronicle
        @chronicle.regenerate_invite_code
        if @chronicle.save
          render json: @chronicle
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def join
        @chronicle.players << current_player

        if @chronicle.save
          render json: @chronicle
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def destroy
        authorize @chronicle
        render json: @chronicle.destroy
      end

      def update
        authorize @chronicle
        if @chronicle.update_attributes(chronicle_params)
          render json: @chronicle
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      private

      def set_chronicle
        @chronicle = Chronicle.find(params[:id])
      end

      def check_token
        @chronicle = Chronicle.find_by(invite_code: params[:invite_code])
      end

      def chronicle_params
        params.require(:chronicle).permit!
      end
    end
  end
end
