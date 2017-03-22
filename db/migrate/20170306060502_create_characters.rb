class CreateCharacters < ActiveRecord::Migration[5.0]
  def change
    create_table :characters do |t|

      # Vitals
      t.string  :name
      t.text    :description,         default: ""

      t.integer :essence,             default: 1
      t.integer :willpower_temporary, default: 5
      t.integer :willpower_permanent, default: 5

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

      # Attributes
      t.integer :attr_strength,       default: 1
      t.integer :attr_dexterity,      default: 1
      t.integer :attr_stamina,        default: 1
      t.integer :attr_charisma,       default: 1
      t.integer :attr_manipulation,   default: 1
      t.integer :attr_appearance,     default: 1
      t.integer :attr_perception,     default: 1
      t.integer :attr_intelligence,   default: 1
      t.integer :attr_wits,           default: 1

      # Abilities
      t.integer :abil_archery,        default: 0
      t.integer :abil_athletics,      default: 0
      t.integer :abil_awareness,      default: 0
      t.integer :abil_brawl,          default: 0
      t.integer :abil_bureaucracy,    default: 0
      t.integer :abil_dodge,          default: 0
      t.integer :abil_integrity,      default: 0
      t.integer :abil_investigation,  default: 0
      t.integer :abil_larceny,        default: 0
      t.integer :abil_linguistics,    default: 0
      t.integer :abil_lore,           default: 0
      t.integer :abil_medicine,       default: 0
      t.integer :abil_melee,          default: 0
      t.integer :abil_occult,         default: 0
      t.integer :abil_performance,    default: 0
      t.integer :abil_presence,       default: 0
      t.integer :abil_resistance,     default: 0
      t.integer :abil_ride,           default: 0
      t.integer :abil_sail,           default: 0
      t.integer :abil_socialize,      default: 0
      t.integer :abil_stealth,        default: 0
      t.integer :abil_survival,       default: 0
      t.integer :abil_thrown,         default: 0
      t.integer :abil_war,            default: 0

      t.json    :abil_craft,          default: [] # [{ craft: "Blacksmithing", rating: 3 }]
      t.json    :abil_martial_arts,   default: [] # [{ style: "Snake Style",   rating: 5 }]

      t.json    :specialties,         default: [] # [{ ability: "Melee", context: "Swords" }]

      # Intimacies
      t.json    :ties,                default: [] # [{ subject: "I must protect those I love", rating: 3 }]
      t.json    :principles,          default: [] # [{ subject: "The Mayor's Daughter (love)", rating: 2 }]

      t.string  :armor_name,          default: "unarmored"
      t.string  :armor_weight,        default: "unarmored"
      t.boolean :armor_is_artifact,   default: false
      t.string  :armor_tags, array: true, default: []

      # Experience points of all kinds
      t.integer :xp_total,            default: 0
      t.integer :xp_spent,            default: 0
      t.integer :xp_solar_total,      default: 0
      t.integer :xp_solar_spent,      default: 0

      t.integer :xp_craft_silver,     default: 0
      t.integer :xp_craft_gold,       default: 0
      t.integer :xp_craft_white,      default: 0

      # Sorcery
      t.boolean :is_sorcerer,         default: false
      t.integer :sorcerous_motes,     default: 0
      t.text    :shaping_rituals,     default: ""

      # Misc
      t.string  :native_language,     default: "Riverspeak"
      t.text    :lore_background,     default: ""

      t.timestamps
    end
  end
end
