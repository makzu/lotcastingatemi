# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CharmLoadout do
  let(:character) { create(:alchemical_character, name: 'Test Character') }
  let(:loadout) { create(:charm_loadout, character: character) }

  it "doesn't allow charms that don't belong to the character", :focus do
    charm = Charm.create(name: 'Test Charm', character: create(:character))

    expect { loadout.charms << charm }.to raise_error(ActiveRecord::RecordInvalid)
  end
end
