class AddAttributeToWeapons < ActiveRecord::Migration[5.1]
  def change
    add_column :weapons, :attr, :string, default: "dexterity"
  end
end
