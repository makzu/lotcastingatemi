class AddBonusesToWeapons < ActiveRecord::Migration[5.2]
  def change
    add_column :weapons, :bonus_accuracy, :integer, default: 0
    add_column :weapons, :bonus_damage, :integer, default: 0
    add_column :weapons, :bonus_defense, :integer, default: 0
    add_column :weapons, :bonus_overwhelming, :integer, default: 0
    add_column :weapons, :notes, :text, default: ''
  end
end
