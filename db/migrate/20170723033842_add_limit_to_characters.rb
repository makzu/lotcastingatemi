class AddLimitToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :limit, :integer
    add_column :characters, :limit_trigger, :string
  end
end
