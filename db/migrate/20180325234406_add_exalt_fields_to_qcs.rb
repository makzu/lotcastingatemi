class AddExaltFieldsToQcs < ActiveRecord::Migration[5.1]
  def change
    change_table :qcs do |q|
      q.integer :anima_level,     default: 0
      q.string  :excellency,      default: ''
      q.json    :motes_committed, default: []
    end
  end
end
