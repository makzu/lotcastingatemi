class AddLoadoutsToCharms < ActiveRecord::Migration[7.2]
  def change
    add_column :characters, :active_loadout, :string, default: nil
    add_column :charms, :loadouts, :string, array: true, default: []
  end
end
