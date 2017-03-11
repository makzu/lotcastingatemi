class CreateQcs < ActiveRecord::Migration[5.0]
  def change
    create_table :qcs do |t|
      # Vitals
      t.string  :name
      t.text    :description

      t.integer :essence,             default: 1
      t.integer :willpower_temporary, default: 3
      t.integer :willpower_permanent, default: 3

      t.integer :motes_personal_total, default: 0
      t.integer :motes_peripheral_total, default: 0
      t.integer :motes_personal_current, default: 0
      t.integer :motes_peripheral_current, default: 0

      # Damage
      t.integer :health_level_0s,     default: 1
      t.integer :health_level_1s,     default: 2
      t.integer :health_level_2s,     default: 2
      t.integer :health_level_4s,     default: 1
      t.integer :health_level_incap,  default: 1

      t.integer :damage_bashing,      default: 0
      t.integer :damage_lethal,       default: 0
      t.integer :damage_aggravated,   default: 0

      # Combat-only stats
      t.integer :initiative,          default: 0
      t.integer :onslaught,           default: 0

      t.integer :join_battle,         default: 1
      t.integer :movement,            default: 1

      # defenses
      t.integer :soak,                default: 1
      t.integer :hardness,            default: 0
      t.integer :appearance,          default: 1
      t.integer :resolve,             default: 1
      t.integer :guile,               default: 1
      t.integer :evasion,             default: 1
      t.integer :parry,               default: 1
      t.string  :armor_name

      t.json    :actions # [{ action: "senses", pool: 4 }]

      t.string  :ref

      t.timestamps
    end
  end
end
