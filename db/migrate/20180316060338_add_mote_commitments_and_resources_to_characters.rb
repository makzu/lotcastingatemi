class AddMoteCommitmentsAndResourcesToCharacters < ActiveRecord::Migration[5.1]
  def change
    change_table :characters do |t|
      t.json :motes_committed, default: [] # { pool: 'peripheral', label: 'artifact xyz', motes: 2 }
      t.json :resources, default: [] # { resource: 'halos', value: 0 }
      t.string :anima_display, default: ""
    end
  end
end
