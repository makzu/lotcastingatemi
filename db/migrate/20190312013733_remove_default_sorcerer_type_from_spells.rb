class RemoveDefaultSorcererTypeFromSpells < ActiveRecord::Migration[5.2]
  def change
    change_column_default :spells, :sorcerer_type, from: 'Character', to: nil
    remove_foreign_key :spells, :characters
  end
end
