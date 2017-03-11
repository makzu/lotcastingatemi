class CreateQcMerits < ActiveRecord::Migration[5.0]
  def change
    create_table :qc_merits do |t|
      t.references :qc, foreign_key: true
      t.string :name
      t.boolean :latent,  default: false
      t.boolean :magical, default: false
      t.text :body

      t.string :ref

      t.timestamps
    end
  end
end
