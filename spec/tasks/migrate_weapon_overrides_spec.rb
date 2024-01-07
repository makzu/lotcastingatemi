# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'rake lca:migrate:weapon_overrides', type: :task do
  let(:weapon) { create(:weapon) }

  it 'preloads the Rails env' do
    expect(task.prerequisites).to include 'environment'
  end

  it 'runs gracefully with no weapons' do
    expect { task.execute }.not_to raise_error
  end

  it 'migrates an ordinary weapon', :aggregate_failures do
    task.execute
    weapon.reload
    expect(weapon.overrides).to eq({})
    expect(weapon).to be_valid
  end

  it 'migrates The Burning Name', :aggregate_failures do
    weapon.update(attr: 'intelligence', ability: 'occult')
    task.execute
    weapon.reload
    expect(weapon.overrides).to eq('attack_attribute' => { 'use' => 'intelligence' },
                                   'defense_attribute' => { 'use' => 'intelligence' })
    expect(weapon).to be_valid
  end

  it 'migrates Elemental Bolt Attack', :aggregate_failures do
    weapon.update(tags: ['elemental bolt', 'air'])
    task.execute
    expect(weapon.overrides).to eq('damage_attribute' => { 'use' => 'essence' })
    expect(weapon).to be_valid
  end
end
