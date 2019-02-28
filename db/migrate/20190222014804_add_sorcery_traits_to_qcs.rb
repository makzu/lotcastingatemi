class AddSorceryTraitsToQcs < ActiveRecord::Migration[5.2]
  def change
    add_column :qcs, :resources,       :json,    default: []
    add_column :qcs, :is_sorcerer,     :boolean, default: false
    add_column :qcs, :aura,            :string,  default: ''
    add_column :qcs, :rituals,         :string,  array: true, default: []
    add_column :qcs, :sorcerous_motes, :integer, default: 0
    add_column :qcs, :shape_sorcery,   :integer, default: 0
    add_column :qcs, :anima_display,   :string,  default: ''

    add_column :spells, :sorcerer_type, :string, default: 'Character'
    rename_column :spells, :character_id, :sorcerer_id
  end
end
