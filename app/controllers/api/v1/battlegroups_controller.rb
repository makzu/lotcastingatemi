# frozen_string_literal: true

module Api
  module V1
    class BattlegroupsController < BaseController
      before_action :authenticate_player
      before_action :set_battlegroup, only: %i[show update destroy]
    end

    def show
      authorize @battlegroup
      render json: @battlegroup.as_json(include: %i[weapons merits])
    end

    def create
      render json: Battlegroup.create(battlegroup_params)
    end

    def destroy
      authorize @battlegroup
      render json: @battlegroup.destroy
    end

    def update
      authorize @battlegroup
      @battlegroup.update_attributes(battlegroup_params)
      render json: @battlegroup
    end

    private

    def set_battlegroup
      @battlegroup = Battlegroup.find(params[:id])
    end

    def battlegroup_params
      params.require(:battlegroup).permit!
    end
  end
end
