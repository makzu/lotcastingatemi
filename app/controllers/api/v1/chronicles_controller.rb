#RFC = Reason For Change

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
    render json: Chronicle.create(chronicle_params)
  end

  def destroy
<<<<<<< HEAD
    #RFC: Chronicle is set in your before action
    respond_with :api, :v1, @chronicle.destroy
  end

  def update
    #chronicle = Chronicle.find(params["id"])
    #RFC: Chronicle is set in your before action
    @chronicle.update_attributes(chronicle_params)
    respond_with @chronicle, json: @chronicle
=======
    render json: @chronicle.destroy
  end

  def update
    @chronicle.update_attributes(chronicle_params)
    render json: @chronicle
>>>>>>> afd2bd39e921b2fa0f9239dc5faec35e9db0c8a4
  end

  private
  def set_chronicle
    @chronicle = Chronicle.find(params[:id])
  end

  def chronicle_params
    params.require(:chronicle).permit!
  end
end

