class Api::V1::BaseController < ActionController::API
  include Knock::Authenticable
  include Pundit

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def record_not_found
    render status: :not_found
  end

  def pundit_user
    current_player
  end
end
