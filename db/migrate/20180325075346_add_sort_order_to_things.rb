class AddSortOrderToThings < ActiveRecord::Migration[5.1]
  def change
    add_column :characters,   :sort_order, :integer, default: 0
    add_column :charms,       :sort_order, :integer, default: 0
    add_column :merits,       :sort_order, :integer, default: 0
    add_column :spells,       :sort_order, :integer, default: 0
    add_column :weapons,      :sort_order, :integer, default: 0
    add_column :qcs,          :sort_order, :integer, default: 0
    add_column :qc_charms,    :sort_order, :integer, default: 0
    add_column :qc_merits,    :sort_order, :integer, default: 0
    add_column :qc_attacks,   :sort_order, :integer, default: 0
    add_column :battlegroups, :sort_order, :integer, default: 0

    add_column :characters,   :chronicle_sort_order, :integer, default: 0
    add_column :qcs,          :chronicle_sort_order, :integer, default: 0
    add_column :battlegroups, :chronicle_sort_order, :integer, default: 0
  end
end
