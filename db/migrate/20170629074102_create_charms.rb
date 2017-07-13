class CreateCharms < ActiveRecord::Migration[5.1]
  def change
    create_table :charms do |t|
      t.belongs_to :character, foreign_key: true
      t.string :name, default: "New Charm"
      t.string :cost, default: "0m"
      t.string :keywords, array: true, default: []
      t.integer :min_essence, default: 1
      t.string :timing, default: "reflexive"
      t.string :duration, default: "instant"
      t.string :prereqs, default: "none"
      t.text :body, default: ""
      t.string :ref, default: ""

      t.string :type
      t.string :character_type

      # Evocations:
      t.string :artifact_name

      # Solar (or other Ability Exalt) Charms:
      t.string :ability
      t.integer :min_ability

      # Martial Arts Charms:
      t.string :style

      t.timestamps
    end
  end
end
