# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationJob, type: :job do
  let(:character) { create(:character) }

  it 'broadcast_create works' do
    expect do
      described_class.new.broadcast_create(character.player_id, character, {}, 'player', character.player_id)
    end.to(have_broadcasted_to("entity-update-#{character.player_id}").with do |msg|
      expect(msg['event']).to eq 'create'
      expect(msg['type']).to eq character.entity_type
      expect(msg['assoc']).to eq character.entity_assoc + 's'
    end)
  end

  it 'broadcast_update works' do
    expect do
      described_class.new.broadcast_update(character.player_id, character, attr_strength: 5)
    end.to(have_broadcasted_to("entity-update-#{character.player_id}").with do |msg|
      expect(msg['event']).to eq 'update'
      expect(msg['type']).to eq character.entity_type
    end)
  end

  it 'broadcast_destroy works' do
    expect do
      described_class.new.broadcast_destroy(character.player_id, character, 'player', character.player_id, nil)
    end.to(have_broadcasted_to("entity-update-#{character.player_id}").with do |msg|
      expect(msg['event']).to eq 'destroy'
      expect(msg['type']).to eq character.entity_type
      expect(msg['assoc']).to eq character.entity_assoc + 's'
    end)
  end
end
