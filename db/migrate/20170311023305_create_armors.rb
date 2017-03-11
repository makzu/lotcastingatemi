class CreateArmors < ActiveRecord::Migration[5.0]
  def change
    create_table :armors do |t|
      t.belongs_to :character, foreign_key: true
      t.string :name
      t.string :weight
      t.string :tags, array: true
      t.boolean :is_artifact, default: false
      t.boolean :equipped, default: false

      t.timestamps
    end
  end
end
