class CreateSolarCharacters < ActiveRecord::Migration[5.1]
  def change
    change_table :characters do |t|
      t.string :type
      t.string :caste
      t.string :caste_abilities, array: true, default: []
      t.string :favored_abilities, array: true, default: []
      t.string :supernal_ability
      t.integer :anima_level, default: 0

      t.integer :motes_personal_total, default: 0
      t.integer :motes_peripheral_total, default: 0
      t.integer :motes_personal_current, default: 0
      t.integer :motes_peripheral_current, default: 0
    end
  end
end
