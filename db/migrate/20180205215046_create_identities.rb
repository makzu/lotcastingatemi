class CreateIdentities < ActiveRecord::Migration[5.1]
  def change
    create_table :identities do |t|
      t.string :provider
      t.string :name
      t.string :email
      t.string :image
      t.string :uid
      t.belongs_to :player, foreign_key: true

      t.string :token
      t.string :refresh_token
      t.datetime :expires_at

      t.timestamps
    end
  end
end
