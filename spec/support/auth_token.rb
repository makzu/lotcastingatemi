# frozen_string_literal: true

def authenticated_header(user)
  { 'Authorization' => "Bearer #{user.token}" }
end
