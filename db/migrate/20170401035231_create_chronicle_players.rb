class CreateChroniclePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :chronicle_players do |t|
      t.belongs_to :chronicle, foreign_key: true
      t.belongs_to :player, foreign_key: true

      t.timestamps
    end
    rename_column :chronicles, :player_id, :st_id
  end
end
