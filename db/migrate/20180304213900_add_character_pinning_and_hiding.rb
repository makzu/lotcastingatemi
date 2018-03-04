class AddCharacterPinningAndHiding < ActiveRecord::Migration[5.1]
  def change
    add_column :characters,   :pinned, :boolean, default: false
    add_column :characters,   :hidden, :boolean, default: false
    add_column :qcs,          :pinned, :boolean, default: false
    add_column :qcs,          :hidden, :boolean, default: false
    add_column :battlegroups, :pinned, :boolean, default: false
    add_column :battlegroups, :hidden, :boolean, default: false
  end
end
