# frozen_string_literal: true

module Api
  module V1
    class ChroniclesController < Api::V1::BaseController
      before_action :authenticate_player
      before_action :set_chronicle, except: %i[index create join]
      before_action :set_chronicle_from_token, only: %i[join]

      def index
        authorize current_player
        @chronicles = current_player.own_chronicles + current_player.chronicles
        render json: @chronicles, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def show
        authorize @chronicle
        render json: @chronicle
      end

      def create
        @chronicle = Chronicle.new(chronicle_params)
        @chronicle.st ||= current_player
        authorize @chronicle

        if @chronicle.save
          render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def regen_invite_code
        authorize @chronicle, :update?
        @chronicle.regenerate_invite_code
        if @chronicle.save
          render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def join
        authorize current_player, :update?
        @chronicle.players << current_player

        if @chronicle.save
          render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def remove_player
        authorize @chronicle, :update?
        @player = Player.find_by!(id: params[:player_id])
        check_player @player

        @chronicle.remove_player(@player)

        if @chronicle.save
          render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def add_character
        @character = Character.find(params[:character_id])
        authorize @character, :update?
        check_player @character.player

        @chronicle.characters << @character
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def add_qc
        @qc = Qc.find(params[:qc_id])
        authorize @qc, :update?
        check_player @qc.player

        @chronicle.qcs << @qc
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def add_battlegroup
        @battlegroup = Battlegroup.find(params[:battlegroup_id])
        authorize @battlegroup, :update?
        check_player @battlegroup.player

        @chronicle.battlegroups << @battlegroup
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def destroy
        authorize @chronicle
        render json: @chronicle.destroy
      end

      def update
        authorize @chronicle
        if @chronicle.update(chronicle_params)
          render json: @chronicle
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      private

      def set_chronicle
        @chronicle = policy_scope(Chronicle).find(params[:id])
      end

      def set_chronicle_from_token
        @chronicle = Chronicle.find_by!(invite_code: params[:invite_code])
      end

      def check_player(player)
        raise ActiveRecord::RecordNotFound unless # TODO: use a better error
          player.chronicles.include?(@chronicle) ||
          player.own_chronicles.include?(@chronicle)
      end

      def chronicle_params
        params.require(:chronicle).permit!
      end
    end
  end
end
