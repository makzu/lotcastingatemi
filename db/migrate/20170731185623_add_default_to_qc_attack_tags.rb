class AddDefaultToQcAttackTags < ActiveRecord::Migration[5.1]
  def change
    change_column_default :qc_attacks, :tags, from: nil, to: []
    change_column_default :spells, :cost, from: '0sm', to: '0sm, 1wp'
  end
end
