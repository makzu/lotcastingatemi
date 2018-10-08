class AddPortraitToQcs < ActiveRecord::Migration[5.2]
  def change
    add_column :qcs, :portrait_link, :string
    add_column :battlegroups, :portrait_link, :string
  end
end
