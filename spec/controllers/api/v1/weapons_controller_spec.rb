# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::WeaponsController do
  def authenticated_header(user)
    "Bearer #{user.token}"
  end

  let(:player) { create(:player) }
  let(:character) { create(:character, player_id: player.id) }
  let(:weapon) { create(:weapon, character_id: character.id) }

  describe 'POST #create' do
    context 'with invalid attributes' do
      it 'Increases Weapon count by 0' do
        request.headers['Authorization'] = authenticated_header(player)
        invalid_weapon_params = attributes_for(:weapon, weight: 'extra heavy')

        expect do
          post :create, params: { character_id: character.id, weapon: invalid_weapon_params },
                        format: :json
        end.not_to change(Weapon, :count)
      end
    end
  end

  describe 'PATCH #update' do
    context 'with valid attributes' do
      it 'Updates weapon attributes' do
        request.headers['Authorization'] = authenticated_header(player)

        updated_weapon_params = attributes_for(:weapon, character_id: character.id, weight: 'heavy')

        expect(weapon.weight).to eq('light')

        patch :update, params: { character_id: character.id, id: weapon.id, weapon: updated_weapon_params, format: :json }
        weapon.reload

        expect(weapon.weight).to eq('heavy')
      end
    end

    context 'with invalid attributes' do
      it 'Updates weapon attributes' do
        request.headers['Authorization'] = authenticated_header(player)
        invalid_updated_weapon_params = attributes_for(:weapon, character_id: character.id, weight: 'Invalid Weight')

        expect(weapon.weight).to eq('light')

        patch :update, params: { character_id: character.id, id: weapon.id, weapon: invalid_updated_weapon_params, format: :json }
        weapon.reload

        expect(weapon.weight).to eq('light')
      end
    end
  end
end
