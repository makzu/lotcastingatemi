class CreateWeapons < ActiveRecord::Migration[5.0]
  def change
    create_table :weapons do |t|
      t.references :character, foreign_key: true
      t.string :name
      t.string :weight
      t.string :tags, array: true
      t.boolean :is_artifact, default: false

      t.timestamps
    end
  end
end
