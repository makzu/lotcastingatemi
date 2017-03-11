class Api::V1::BaseController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  respond_to :json

  def record_not_found
    render status: :not_found
  end
end
