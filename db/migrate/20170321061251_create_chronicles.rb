class CreateChronicles < ActiveRecord::Migration[5.1]
  def change
    create_table :chronicles do |t|
      t.references :player
      t.string :name

      t.timestamps
    end

    change_table(:characters) do |t|
      t.references :chronicle, foreign_key: true
    end

    change_table(:qcs) do |t|
      t.references :chronicle, foreign_key: true
    end
  end
end
