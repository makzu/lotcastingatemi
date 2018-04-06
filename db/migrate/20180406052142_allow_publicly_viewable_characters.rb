class AllowPubliclyViewableCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters,   :public, :boolean, default: false
    add_column :qcs,          :public, :boolean, default: false
    add_column :battlegroups, :public, :boolean, default: false
  end
end
