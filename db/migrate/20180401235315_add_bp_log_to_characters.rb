class AddBpLogToCharacters < ActiveRecord::Migration[5.1]
  def change
    add_column :characters, :bp_log, :json, default: []
  end
end
