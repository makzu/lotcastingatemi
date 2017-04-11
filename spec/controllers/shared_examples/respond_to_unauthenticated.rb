RSpec.shared_examples 'respond_to_unauthenticated' do |action|
  before do
    get action, params: { id: 1, character_id: 1, qc_id: 1 }
  end

  it 'responds with 401' do
    expect(response.status).to eq 401
  end
end
