class Api::V1::ChroniclesController < Api::V1::BaseController
  before_action :authenticate_player
  before_action :set_chronicle, only: [:show, :update, :destroy]

  def show
    render json: @chronicle.as_json( include: {
      st: { only: [:name, :id]},
      players: { only: [:name, :id]},
      characters: { include: [:weapons, :merits ]},
      qcs: { include: [ :qc_attacks, :qc_merits ]}
    })
  end

  def create
    render json: Chronicle.create(chronicle_params)
  end

  def destroy
    render json: @chronicle.destroy
  end

  def update
    @chronicle.update_attributes(chronicle_params)
    render json: @chronicle
  end

  def update
    @chronicle.update_attributes(chronicle_params)
    render json: @chronicle
  end

  private
  def set_chronicle
    @chronicle = Chronicle.find(params[:id])
  end

  def chronicle_params
    params.require(:chronicle).permit!
  end
end
