# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Weapon, type: :model do
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
      expect(weapon.damage_attr).to eq('essence')
    end

    it 'sets the weapon as an artifact when adding' do
      weapon = create(:weapon)
      weapon.update(tags: ['elemental bolt'])
      expect(weapon.is_artifact).to eq(true)
    end

    it 'leaves the damage attr alone when its just there' do
      weapon = create(:weapon, tags: ['elemental bolt'])
      weapon.update(damage_attr: 'strength')

      weapon.update(tags: ['elemental bolt', 'fire'])
      expect(weapon.damage_attr).to eq('strength')
    end
  end
end
