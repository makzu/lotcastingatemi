class CreateWeapons < ActiveRecord::Migration[5.0]
  def change
    create_table :weapons do |t|
      t.references :character, foreign_key: true
      t.string :name
      t.string :ability

      t.string :weight,            default: "light"
      t.string :tags, array: true, default: []
      t.boolean :is_artifact,      default: false

      t.timestamps
    end
  end
end
