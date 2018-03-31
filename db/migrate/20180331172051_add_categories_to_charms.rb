class AddCategoriesToCharms < ActiveRecord::Migration[5.1]
  def change
    change_table :charms do |t|
      t.string :categories, array: true, default: []
      t.string :summary, default: ''
    end
  end
end
