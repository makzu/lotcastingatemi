class AddDigestToPlayers < ActiveRecord::Migration[5.1]
  def change
    change_table :players do |t|
      t.string :email
      t.string :password_digest
    end
  end
end
