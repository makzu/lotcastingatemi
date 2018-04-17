class AddAnimaPowersToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :anima_powers, :string, array: true, default: []
  end
end
