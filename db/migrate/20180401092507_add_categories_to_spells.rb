class AddCategoriesToSpells < ActiveRecord::Migration[5.1]
  def change
    add_column :spells, :categories, :string, array: true, default: []
  end
end
