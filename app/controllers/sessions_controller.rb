# frozen_string_literal: true

class SessionsController < ApplicationController
  # Omniauth login callback
  # TODO allow multiple oauth providers per Player and Player/identity merging
  def create
    auth = request.env['omniauth.auth']
    @identity = Identity.find_or_create_with_omniauth(auth)

    @player = @identity.player
    @referer = request.referer
  end
end
