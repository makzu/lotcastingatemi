class CreatePoisons < ActiveRecord::Migration[5.2]
  def change
    create_table :poisons do |t|
      t.string :name, default: ''
      t.integer :penalty, default: 0
      t.string :interval, default: 'rounds'
      t.integer :damage, default: 1
      t.string :damage_type, default: 'i'
      t.string :crash_damage_type, default: 'x'
      t.string :vector, default: ''
      t.integer :duration, default: 1
      t.string :duration_type, default: 'rounds'
      t.text :notes, default: ''
      t.integer :sort_order, default: 0
      t.string :ref, default: ''
      t.references :poisonable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
