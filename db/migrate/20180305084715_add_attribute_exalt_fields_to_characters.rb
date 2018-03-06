class AddAttributeExaltFieldsToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :exalt_type, :string, default: 'Mortal'
    add_column :characters, :caste_attributes, :string, array: true, default: []
    add_column :characters, :favored_attributes, :string, array: true, default: []
    add_column :characters, :aspect, :boolean, default: false
  end
end
