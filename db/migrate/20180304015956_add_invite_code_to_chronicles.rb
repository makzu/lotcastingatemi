class AddInviteCodeToChronicles < ActiveRecord::Migration[5.1]
  def change
    add_column :chronicles, :invite_code, :string
    add_index :chronicles, :invite_code, unique: true
  end
end
