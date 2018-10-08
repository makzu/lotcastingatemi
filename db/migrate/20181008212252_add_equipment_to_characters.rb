class AddEquipmentToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :equipment, :text
  end
end
