class CreateCombatActors < ActiveRecord::Migration[5.1]
  def change
    create_table :combat_actors do |t|
      t.string  :name,                     default: ''
      t.integer :initiative,               default: 0
      t.integer :onslaught,                default: 0
      t.integer :damage_bashing,           default: 0
      t.integer :damage_lethal,            default: 0
      t.integer :damage_aggravated,        default: 0
      t.integer :motes_personal_current,   default: 0
      t.integer :motes_peripheral_current, default: 0
      t.integer :willpower_temporary,      default: 0
      t.integer :anima_level,              default: 0
      t.boolean :has_acted,                default: false

      t.belongs_to :chronicle, foreign_key: true
      t.belongs_to :player, foreign_key: true
      t.belongs_to :actor, polymorphic: true

      t.timestamps
    end

    add_column :characters,   :in_combat, :boolean, default: false
    add_column :characters,   :has_acted, :boolean, default: false
    add_column :qcs,          :in_combat, :boolean, default: false
    add_column :qcs,          :has_acted, :boolean, default: false
    add_column :battlegroups, :in_combat, :boolean, default: false
    add_column :battlegroups, :has_acted, :boolean, default: false
  end
end
