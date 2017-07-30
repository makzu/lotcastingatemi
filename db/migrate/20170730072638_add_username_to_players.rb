class AddUsernameToPlayers < ActiveRecord::Migration[5.1]
  def change
    change_table :players do |t|
      t.rename :name, :display_name
      t.string :username
      t.index :username
    end
  end
end
