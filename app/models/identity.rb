# frozen_string_literal: true

# Oauth identities that belong to a particular player.
class Identity < ApplicationRecord
  belongs_to :player

  def self.find_or_create_with_omniauth(auth)
    iden = find_or_initialize_by(uid: auth['uid'], provider: auth['provider'])
    iden.email = auth['info']['email']
    iden.image = auth['info']['image']
    iden.token = auth['credentials']['token']
    iden.expires_at = auth['credentials']['expires_at']

    iden.player ||= Player.create_from_oauth(auth)

    iden.save
    iden
  end
end
