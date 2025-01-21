class AddSortingToCharmLoadouts < ActiveRecord::Migration[7.2]
  def change
    add_column :charm_loadouts, :sorting, :integer
  end
end
