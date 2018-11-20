class AddArmorCustomizationToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :bonus_hardness, :integer, default: 0
    add_column :characters, :bonus_soak, :integer, default: 0
    add_column :characters, :bonus_mobility_penalty, :integer, default: 0
  end
end
