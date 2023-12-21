class AddNewSortingColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :sorting, :integer
    add_column :characters, :chronicle_sorting, :integer
    add_column :charms, :sorting, :integer
    add_column :merits, :sorting, :integer
    add_column :weapons, :sorting, :integer
    add_column :spells, :sorting, :integer
    add_column :poisons, :sorting, :integer

    add_column :qcs, :sorting, :integer
    add_column :qcs, :chronicle_sorting, :integer
    add_column :qc_attacks, :sorting, :integer
    add_column :qc_charms, :sorting, :integer
    add_column :qc_merits, :sorting, :integer

    add_column :battlegroups, :sorting, :integer
    add_column :battlegroups, :chronicle_sorting, :integer
  end
end
