class MakeBattlegroupsTheirOwnThing < ActiveRecord::Migration[5.1]
  def change
    change_table :battlegroups do |t|
      t.belongs_to :player, foreign_key: true
      t.belongs_to :chronicle, foreign_key: true
      t.remove_references :qc

      t.text :description, default: ""
      t.integer :magnitude, default: 7
      t.integer :essence, default: 1
      t.integer :willpower_temporary, default: 3
      t.integer :willpower_permanent, default: 3
      t.integer :soak, default: 1
      t.integer :hardness, default: 0
      t.integer :evasion, default: 1
      t.integer :parry, default: 1
      t.integer :movement, default: 1
      t.integer :resolve, default: 1
      t.integer :guile, default: 1
      t.integer :appearance, default: 1
      t.integer :join_battle, default: 1
      t.string :armor_name, default: ""
      t.integer :senses, default: 1

      t.integer :initiative, default: 0
      t.integer :onslaught, default: 0
    end

    change_table :qc_attacks do |t|
      t.rename :qc_id, :qc_attackable_id
      t.string :qc_attackable_type
    end
  end
end
