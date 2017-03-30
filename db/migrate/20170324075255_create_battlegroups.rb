class CreateBattlegroups < ActiveRecord::Migration[5.1]
  def change
    create_table :battlegroups do |t|
      t.references :qc, foreign_key: true

      t.integer :size,               default: 0
      t.integer :might,              default: 0
      t.integer :drill,              default: 0
      t.boolean :perfect_morale,     default: false

      t.integer :magnitude_current,  default: 7

      t.timestamps
    end
  end
end
