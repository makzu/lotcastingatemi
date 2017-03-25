class AddIntimaciesToQcs < ActiveRecord::Migration[5.1]
  def change
    change_table :qcs do |t|
      # Intimacies
      t.json :ties,       default: [] # [{ subject: "I must protect those I love", rating: 3 }]
      t.json :principles, default: [] # [{ subject: "The Mayor's Daughter (love)", rating: 2 }]
    end
  end
end
