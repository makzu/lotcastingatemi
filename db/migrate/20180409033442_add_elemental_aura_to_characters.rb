class AddElementalAuraToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :aura, :string, default: ''
  end
end
