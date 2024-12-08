class CreateCharmSlots < ActiveRecord::Migration[7.1]
  def change
    create_table :charm_slots do |t|
      t.belongs_to :charm_loadout, null: false, foreign_key: true
      t.belongs_to :charm, null: false, foreign_key: true

      t.timestamps
    end
  end
end
