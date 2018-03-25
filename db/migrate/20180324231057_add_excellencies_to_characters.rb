class AddExcellenciesToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :excellency, :string, default: ''
    add_column :characters, :excellency_stunt, :string, default: ''
    add_column :characters, :excellencies_for, :string, array: true, default: []
  end
end
