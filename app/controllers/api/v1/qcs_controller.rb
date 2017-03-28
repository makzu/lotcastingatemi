class Api::V1::QcsController < Api::V1::BaseController
  before_action :set_qc, only: [:show, :update, :destroy]

  def show
    render json: @qc
  end

  def create
    render json: Qc.create(qc_params).as_json
  end

  def destroy
    render json: @qc.destroy
  end

  def update
    @qc.update_attributes(qc_params)
    render json: @qc
  end

  private
  def set_qc
    @qc = Qc.find(params[:id])
  end

  def qc_params
    params.require(:qc).permit!
  end
end
