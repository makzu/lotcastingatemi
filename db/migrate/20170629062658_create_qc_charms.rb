class CreateQcCharms < ActiveRecord::Migration[5.1]
  def change
    create_table :qc_charms do |t|
      t.belongs_to :qc, foreign_key: true
      t.string :name, default: "New QC Charm"
      t.string :cost, default: ""
      t.string :timing, default: "supplemental"
      t.string :duration, default: "instant"
      t.string :keywords, array: true, default: []
      t.integer :min_essence, default: 1
      t.text :body, default: ""
      t.string :ref, default: ""
      t.string :category, default: "miscellaneous"

      t.timestamps
    end
  end
end
