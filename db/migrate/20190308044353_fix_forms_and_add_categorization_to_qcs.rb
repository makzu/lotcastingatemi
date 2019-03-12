class FixFormsAndAddCategorizationToQcs < ActiveRecord::Migration[5.2]
  def change
    remove_column :characters, :forms, :string, array: true
    add_column :characters, :forms, :json, default: []
    add_column :qcs, :categories, :string, array: true, default: []
    add_column :qcs, :feats_of_strength, :integer, default: 0
    add_column :qcs, :strength, :integer, default: 0
  end
end
