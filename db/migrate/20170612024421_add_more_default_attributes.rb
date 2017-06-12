class AddMoreDefaultAttributes < ActiveRecord::Migration[5.1]
  def change
    change_column_default :chronicles, :name, "New Chronicle"
    change_column_default :characters, :name, "New Character"
    change_column_default :merits, :name, "New Merit"
    change_column_default :weapons, :name, "New Weapon"
    change_column_default :weapons, :ability, "melee"
    change_column_default :qcs, :name, "New QC"
    change_column_default :qcs, :description, ""
    change_column_default :qcs, :armor_name, ""
    change_column_default :qcs, :ref, ""
    change_column_default :qc_attacks, :name, "New Attack"
    change_column_default :qc_merits, :name, "New Merit"
    change_column_default :battlegroups, :name, "New Battlegroup"
  end
end
