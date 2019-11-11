class AddHbtColumnsToMerits < ActiveRecord::Migration[6.0]
  def change
    add_column :merits, :mutation, :boolean, default: false
    add_column :merits, :forms, :string,  array: true, default: []
    add_column :characters, :active_form, :string, default: "base"
  end
end
