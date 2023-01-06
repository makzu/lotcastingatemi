# frozen_string_literal: true

RSpec.shared_examples 'respond_to_unauthenticated' do |action|
  before do
    get action, params: { id: 1, character_id: 1, qc_id: 1 }
  end

  it 'responds with 401' do
    expect(response).to have_http_status :unauthorized
  end
end
