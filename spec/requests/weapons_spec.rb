# frozen_string_literal: true

require 'rails_helper'
require 'requests/shared_examples/character_trait'
require 'support/auth_token'

RSpec.describe 'Weapons' do
  ActiveJob::Base.queue_adapter = :test

  let(:weapon) { create(:weapon) }

  context 'when logged in' do
    describe 'updating a record' do
      it 'works for tags' do
        params = { weapon: { tags: %w[lethal melee balanced] }}
        expect do
          patch "/api/v1/characters/#{weapon.character_id}/weapons/#{weapon.id}",
                params:,
                headers: authenticated_header(weapon.player)
        end.to have_enqueued_job(UpdateBroadcastJob)

        expect(Weapon.find(weapon.id).tags).to eq %w[lethal melee balanced]
      end
    end
  end

  it_behaves_like 'character trait', :weapon, 'characters'
end
