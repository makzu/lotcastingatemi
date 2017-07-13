class CreateSpells < ActiveRecord::Migration[5.1]
  def change
    create_table :spells do |t|
      t.belongs_to :character, foreign_key: true
      t.string :name, default: "New Spell"
      t.string :cost, default: "0sm"
      t.string :circle, default: "emerald"
      t.string :keywords, array: true, default: []
      t.string :duration, default: "instant"
      t.text :body, default: ""
      t.string :ref, default: ""

      t.timestamps
    end
  end
end
