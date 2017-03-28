class Api::V1::ChroniclesController < Api::V1::BaseController
  before_action :set_chronicle, only: [:show, :update, :destroy]

  def show
    render json: @chronicle.as_json( include: {
      st: { only: [:name, :id], include: {
        characters: { include: [:weapons, :merits ]},
        qcs: { include: [ :qc_attacks, :qc_merits ]}
      }}
    })
  end

  def create
    respond_with :api, :v1, Chronicle.create(chronicle_params)
  end

  def destroy
    respond_with Chronicle.destroy(params[:id])
  end

  def update
    chronicle = Chronicle.find(params["id"])
    chronicle.update_attributes(chronicle_params)
    respond_with chronicle, json: chronicle
  end

  private
  def set_chronicle
    @chronicle = Chronicle.find(params[:id])
  end

  def chronicle_params
    params.require(:chronicle).permit!
  end
end
