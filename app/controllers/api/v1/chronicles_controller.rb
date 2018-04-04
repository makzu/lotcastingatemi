# frozen_string_literal: true

module Api
  module V1
    # rubocop:disable Metrics/ClassLength
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
        if current_player.id.to_s == params[:player_id]
          authorize current_player, :update?
          @player = current_player
        else
          authorize @chronicle, :update?
          @player = Player.find_by!(id: params[:player_id])
        end

        @chronicle.remove_player(@player)

        if @chronicle.save
          render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
        else
          render json: @chronicle.errors.details, status: :bad_request
        end
      end

      def add_character
        @character = Character.find(params[:character_id])
        check_auth @character

        @chronicle.characters << @character
        broadcast_update(@character)
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def remove_character
        @character = Character.find(params[:character_id])
        check_auth @character

        @chronicle.characters.delete(@character)
        broadcast_update(@character)
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def add_qc
        @qc = Qc.find(params[:qc_id])
        check_auth @qc

        @chronicle.qcs << @qc
        broadcast_update(@qc)
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def remove_qc
        @qc = Qc.find(params[:qc_id])
        check_auth @qc

        @chronicle.qcs.delete(@qc)
        broadcast_update(@qc)
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def add_battlegroup
        @battlegroup = Battlegroup.find(params[:battlegroup_id])
        check_auth @battlegroup

        @chronicle.battlegroups << @battlegroup
        broadcast_update(@battlegroup)
        render json: @chronicle, include: %w[characters.* qcs.* battlegroups.* players.* st.*]
      end

      def remove_battlegroup
        @battlegroup = Battlegroup.find(params[:battlegroup_id])
        check_auth @battlegroup

        @chronicle.battlegroups.delete(@battlegroup)
        broadcast_update(@battlegroup)
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

      def check_auth(char)
        authorize char, :update?
        raise ActiveRecord::NotAuthorized unless # TODO: use a better error
          @chronicle.st == char.player ||
          @chronicle.players.include?(char.player)
      end

      def chronicle_params
        params.require(:chronicle).permit!
      end

      def broadcast_update(thing)
        ChronicleCharactersBroadcastJob.perform_later(
          [@chronicle.st_id] + @chronicle.player_ids,
          @chronicle,
          thing.entity_type,
          thing
        )
      end
    end
    # rubocop:enable Metrics/ClassLength
  end
end
