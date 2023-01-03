# frozen_string_literal: true

RSpec.describe 'Players' do
  def authenticated_header(user)
    { 'Authorization' => "Bearer #{user.token}" }
  end

  context 'when logged in' do
    describe 'deleting an account' do
      it 'works and also deletes chronicles/characters/etc' do
        player = create(:player, identities: [create(:identity)])
        create(:chronicle, st: player)
        create(:character, player: player)
        create(:qc, player: player)
        create(:battlegroup, player: player)

        expect do
          delete '/api/v1/players',
                 headers: authenticated_header(player)
        end.to  change(Player,      :count).by(-1)
           .and change(Identity,    :count).by(-1)
           .and change(Chronicle,   :count).by(-1)
           .and change(Character,   :count).by(-1)
           .and change(Qc,          :count).by(-1)
           .and change(Battlegroup, :count).by(-1)
      end
    end
  end
end
