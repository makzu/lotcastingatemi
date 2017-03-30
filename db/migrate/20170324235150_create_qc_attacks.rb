class CreateQcAttacks < ActiveRecord::Migration[5.1]
  def change
    create_table :qc_attacks do |t|
      t.references :qc, foreign_key: true
      t.string  :name
      t.integer :pool,            default: 1
      t.string  :range,           default: "close"
      t.integer :damage,          default: 1
      t.integer :overwhelming,    default: 1
      t.string :tags, array: true

      t.timestamps
    end

    change_table :qcs do |t|
      t.integer :senses,          default: 3
      t.integer :grapple,         default: 0
      t.integer :grapple_control, default: 0
    end
  end
end
