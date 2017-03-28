class AddNamesToBattlegroups < ActiveRecord::Migration[5.1]
  def change
    add_column :battlegroups, :name, :string
  end
end
