class CreateCharmLoadouts < ActiveRecord::Migration[7.1]
  def change
    create_table :charm_loadouts do |t|
      t.belongs_to :character, null: false, foreign_key: true
      t.boolean :active, null: false, default: false
      t.string :name, null: false, default: ''

      t.timestamps
    end
  end
end
