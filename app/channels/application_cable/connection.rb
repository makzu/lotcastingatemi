# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_player

    def connect
      self.current_player = find_verified_user
    end

    protected

    def find_verified_user
      token = Knock::AuthToken.new token: request.params[:token]

      verified_user = Player.find(token.payload['sub'])
      return verified_user if verified_user

      reject_unauthorized_connection
    end
  end
end
