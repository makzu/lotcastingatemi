# frozen_string_literal: true

RSpec.shared_examples 'charm' do |trait_type, parent_type|
  let(:charm) { create(trait_type) }

  context 'when logged in' do
    describe 'updating a record' do
      it 'works for keywords' do
        params = { charm.entity_type => { keywords: %w[decisive-only] }}

        expect do
          patch "/api/v1/#{parent_type}/#{charm.character.id}/#{charm.entity_type}s/#{charm.id}",
                params:,
                headers: authenticated_header(charm.player)
        end.to have_enqueued_job(UpdateBroadcastJob).at_least(2).times

        expect(response).to have_http_status :ok
        expect(charm.class.find(charm.id).keywords).to eq %w[decisive-only]
      end

      it 'works for categories' do
        params = { charm.entity_type => { categories: %w[attack supercool] }}
        patch "/api/v1/#{parent_type}/#{charm.character_id}/#{charm.entity_type}s/#{charm.id}",
              params:,
              headers: authenticated_header(charm.player)

        expect(charm.class.find(charm.id).categories).to eq %w[attack supercool]
      end
    end
  end
end
