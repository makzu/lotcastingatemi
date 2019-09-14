class AddPoolOverrides < ActiveRecord::Migration[5.2]
  def change
    add_column :weapons, :overrides, :jsonb, default: {}
    add_column :characters, :base_pool_overrides, :jsonb, default: {}
    add_column :characters, :bonuses, :jsonb, default: []
  end
end
