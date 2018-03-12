# frozen_string_literal: true

RSpec.shared_examples 'character trait' do |trait_type, parent_type|
  def authenticated_header(user)
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    { 'Authorization' => "Bearer #{token}" }
  end

  let(:trait) { create(trait_type) }

  context 'while logged in' do
    describe 'showing a record' do
      it 'succeeds' do
        get "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}",
            headers: authenticated_header(trait.player)

        expect(response.status).to eq 200
      end
    end
  end

  context 'while not logged in' do
    describe 'creating a record' do
      it 'returns an auth failure' do
        post "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/"
        expect(response.status).to eq 401
      end
    end
    describe 'updating a record' do
      it 'returns an auth failure' do
        patch "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
    describe 'destroying a record' do
      it 'returns an auth failure' do
        patch "/api/v1/#{parent_type}/#{trait.character.id}/#{trait.entity_type}s/#{trait.id}"
        expect(response.status).to eq 401
      end
    end
  end
end
