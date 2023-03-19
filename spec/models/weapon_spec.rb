# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Weapon do
  describe 'tags' do
    it 'rejects empty tags' do
      weapon = create(:weapon, tags: ['  ', '', '', ' ', '  bashing'])
      expect(weapon.tags).to eq(['bashing'])
    end

    it 'rejects duplicate tags' do
      weapon = create(:weapon, tags: ['bashing', ' bashing', 'elemental bolt', 'bashing  '])
      expect(weapon.tags).to eq(['bashing', 'elemental bolt'])
    end
  end

  describe 'the elemental bolt tag' do
    it 'changes the damage attribute to essence when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['elemental bolt'])
      expect(weapon.overrides['damage_attribute']).to eq('use' => 'essence')
    end

    it 'sets the weapon as an artifact when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['elemental bolt'])
      expect(weapon.is_artifact).to be(true)
    end

    it 'leaves the damage attr alone when its just there' do
      weapon = create(:weapon, tags: ['elemental bolt'])
      weapon.update(overrides: { damage_attribute: { use: 'strength' }})

      weapon.update(tags: ['elemental bolt', 'fire'])
      expect(weapon.overrides['damage_attribute']).to eq('use' => 'strength')
    end

    pending 'selects the higher of Thrown or Archery for attack pools' # rubocop:todo RSpec/PendingWithoutReason
  end
end
