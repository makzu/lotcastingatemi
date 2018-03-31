class AddColumnsForFutureFeatures < ActiveRecord::Migration[5.1]
  def change
    change_table :characters do |t|
      t.string  :portrait_link, default: ''
      t.json    :xp_log,        default: []
      t.json    :xp_log_solar,  default: []
      t.string  :rituals,       default: [], array: true
      t.text    :notes,         default: ''
      t.boolean :houserules,    default: false
    end
    add_column :chronicles, :notes, :text, default: ''
    add_column :qcs,        :notes, :text, default: ''
    add_column :weapons, :damage_attr, :string, default: 'strength'
  end
end
