class AddControlToSpells < ActiveRecord::Migration[5.1]
  def change
    add_column :spells, :control, :boolean, default: false
  end
end
