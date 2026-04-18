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

    pending 'selects the higher of Thrown or Archery for attack pools'
  end

  describe 'the crypt bolt tag' do
    it 'changes the damage attribute to essence when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['crypt bolt'])
      expect(weapon.overrides['damage_attribute']).to eq('use' => 'essence')
    end

    it 'sets the weapon as an artifact when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['crypt bolt'])
      expect(weapon.is_artifact).to be(true)
    end

    it 'leaves the damage attr alone when its just there' do
      weapon = create(:weapon, tags: ['crypt bolt'])
      weapon.update(overrides: { damage_attribute: { use: 'strength' }})

      weapon.update(tags: ['crypt bolt'])
      expect(weapon.overrides['damage_attribute']).to eq('use' => 'strength')
    end

    pending 'selects the higher of Thrown or Archery for attack pools'
  end

  describe 'the siege tag' do
    it 'sets the weight to heavy when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['siege (long)'])
      expect(weapon.weight).to eq('heavy')
    end

    it 'sets the attack attribute based on the character when adding' do
      character = create(:character, attr_intelligence: 4, attr_perception: 3)
      weapon = create(:weapon, character: character)
      weapon.update(tags: ['siege (long)'])
      expect(weapon.overrides['attack_attribute']).to eq('use' => 'intelligence')

      character2 = create(:character, attr_intelligence: 2, attr_perception: 5)
      weapon2 = create(:weapon, character: character2)
      weapon2.update(tags: ['siege (long)'])
      expect(weapon2.overrides['attack_attribute']).to eq('use' => 'perception')
    end

    it 'sets the ability to war when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['siege (long)'])
      expect(weapon.ability).to eq('war')
    end
  end
end
