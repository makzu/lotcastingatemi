class RemovePasswordsFromPlayers < ActiveRecord::Migration[5.1]
  def up
    change_table :players do |t|
      t.remove :password_digest, :username
    end
  end

  def down
    change_table :players do |t|
      t.string :password_digest
      t.string :username
    end
  end
end
