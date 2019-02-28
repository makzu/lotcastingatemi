class AddLunarTraitsToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :tell,  :string, default: ''
    add_column :characters, :totem, :string, default: ''
    add_column :characters, :forms, :string, array: true, default: []
  end
end
