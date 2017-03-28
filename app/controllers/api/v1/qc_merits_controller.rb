class Api::V1::QcMeritsController < Api::V1::BaseController
  before_action :set_qc_merit, only: [:show, :update, :destroy]

  def show
    render json: @qc_merit
  end

  def create
    render json: QcMerit.create(qc_merit_params)
  end

  def destroy
    render json: @qc_merit.destroy
  end

  def update
    @qc_merit.update_attributes(merit_params)
    render json: @qc_merit
  end

  private
  def set_qc_merit
    @qc_merit = QcMerit.find(params[:id])
  end

  def qc_merit_params
    params.require(:qc_merit).permit!
  end
end
