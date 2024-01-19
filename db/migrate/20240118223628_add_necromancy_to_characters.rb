class AddNecromancyToCharacters < ActiveRecord::Migration[7.1]
  def change
    add_column :characters, :is_necromancer, :boolean, default: false
    add_column :characters, :necromantic_motes, :integer, default: 0
  end
end
