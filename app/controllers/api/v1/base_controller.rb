class Api::V1::BaseController < ActionController::API
  include Pundit

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def record_not_found
    render status: :not_found
  end
end
