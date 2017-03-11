class CreateMerits < ActiveRecord::Migration[5.0]
  def change
    create_table :merits do |t|
      t.references :character, foreign_key: true
      t.integer :rating, default: 1
      t.string :name
      t.string :merit_name
      t.string :merit_cat, default: "story"
      t.text :description
      t.string :ref
      t.boolean :supernatural, default: false
      t.string :prereqs

      t.timestamps
    end
  end
end
