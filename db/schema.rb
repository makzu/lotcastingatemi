# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170717211048) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "battlegroups", force: :cascade do |t|
    t.integer "size", default: 0
    t.integer "might", default: 0
    t.integer "drill", default: 0
    t.boolean "perfect_morale", default: false
    t.integer "magnitude_current", default: 7
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", default: "New Battlegroup"
    t.bigint "player_id"
    t.bigint "chronicle_id"
    t.text "description", default: ""
    t.integer "magnitude", default: 7
    t.integer "essence", default: 1
    t.integer "willpower_temporary", default: 3
    t.integer "willpower_permanent", default: 3
    t.integer "soak", default: 1
    t.integer "hardness", default: 0
    t.integer "evasion", default: 1
    t.integer "parry", default: 1
    t.integer "movement", default: 1
    t.integer "resolve", default: 1
    t.integer "guile", default: 1
    t.integer "appearance", default: 1
    t.integer "join_battle", default: 1
    t.string "armor_name", default: ""
    t.integer "senses", default: 1
    t.integer "initiative", default: 0
    t.integer "onslaught", default: 0
    t.index ["chronicle_id"], name: "index_battlegroups_on_chronicle_id"
    t.index ["player_id"], name: "index_battlegroups_on_player_id"
  end

  create_table "characters", id: :serial, force: :cascade do |t|
    t.string "name", default: "New Character"
    t.text "description", default: ""
    t.integer "essence", default: 1
    t.integer "willpower_temporary", default: 5
    t.integer "willpower_permanent", default: 5
    t.integer "health_level_0s", default: 1
    t.integer "health_level_1s", default: 2
    t.integer "health_level_2s", default: 2
    t.integer "health_level_4s", default: 1
    t.integer "health_level_incap", default: 1
    t.integer "damage_bashing", default: 0
    t.integer "damage_lethal", default: 0
    t.integer "damage_aggravated", default: 0
    t.integer "initiative", default: 0
    t.integer "onslaught", default: 0
    t.integer "attr_strength", default: 1
    t.integer "attr_dexterity", default: 1
    t.integer "attr_stamina", default: 1
    t.integer "attr_charisma", default: 1
    t.integer "attr_manipulation", default: 1
    t.integer "attr_appearance", default: 1
    t.integer "attr_perception", default: 1
    t.integer "attr_intelligence", default: 1
    t.integer "attr_wits", default: 1
    t.integer "abil_archery", default: 0
    t.integer "abil_athletics", default: 0
    t.integer "abil_awareness", default: 0
    t.integer "abil_brawl", default: 0
    t.integer "abil_bureaucracy", default: 0
    t.integer "abil_dodge", default: 0
    t.integer "abil_integrity", default: 0
    t.integer "abil_investigation", default: 0
    t.integer "abil_larceny", default: 0
    t.integer "abil_linguistics", default: 0
    t.integer "abil_lore", default: 0
    t.integer "abil_medicine", default: 0
    t.integer "abil_melee", default: 0
    t.integer "abil_occult", default: 0
    t.integer "abil_performance", default: 0
    t.integer "abil_presence", default: 0
    t.integer "abil_resistance", default: 0
    t.integer "abil_ride", default: 0
    t.integer "abil_sail", default: 0
    t.integer "abil_socialize", default: 0
    t.integer "abil_stealth", default: 0
    t.integer "abil_survival", default: 0
    t.integer "abil_thrown", default: 0
    t.integer "abil_war", default: 0
    t.json "abil_craft", default: []
    t.json "abil_martial_arts", default: []
    t.json "specialties", default: []
    t.json "ties", default: []
    t.json "principles", default: []
    t.string "armor_name", default: "unarmored"
    t.string "armor_weight", default: "unarmored"
    t.boolean "armor_is_artifact", default: false
    t.string "armor_tags", default: [], array: true
    t.integer "xp_total", default: 0
    t.integer "xp_spent", default: 0
    t.integer "xp_solar_total", default: 0
    t.integer "xp_solar_spent", default: 0
    t.integer "xp_craft_silver", default: 0
    t.integer "xp_craft_gold", default: 0
    t.integer "xp_craft_white", default: 0
    t.boolean "is_sorcerer", default: false
    t.integer "sorcerous_motes", default: 0
    t.text "shaping_rituals", default: ""
    t.string "native_language", default: "Riverspeak"
    t.text "lore_background", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "chronicle_id"
    t.string "type"
    t.string "caste"
    t.string "caste_abilities", default: [], array: true
    t.string "favored_abilities", default: [], array: true
    t.string "supernal_ability"
    t.integer "anima_level", default: 0
    t.integer "motes_personal_total", default: 0
    t.integer "motes_peripheral_total", default: 0
    t.integer "motes_personal_current", default: 0
    t.integer "motes_peripheral_current", default: 0
    t.index ["chronicle_id"], name: "index_characters_on_chronicle_id"
    t.index ["player_id"], name: "index_characters_on_player_id"
  end

  create_table "charms", force: :cascade do |t|
    t.bigint "character_id"
    t.string "name", default: "New Charm"
    t.string "cost", default: "0m"
    t.string "keywords", default: [], array: true
    t.integer "min_essence", default: 1
    t.string "timing", default: "reflexive"
    t.string "duration", default: "instant"
    t.string "prereqs", default: "none"
    t.text "body", default: ""
    t.string "ref", default: ""
    t.string "type"
    t.string "character_type"
    t.string "artifact_name"
    t.string "ability"
    t.integer "min_ability"
    t.string "style"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_charms_on_character_id"
  end

  create_table "chronicle_players", force: :cascade do |t|
    t.bigint "chronicle_id"
    t.bigint "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chronicle_id"], name: "index_chronicle_players_on_chronicle_id"
    t.index ["player_id"], name: "index_chronicle_players_on_player_id"
  end

  create_table "chronicles", force: :cascade do |t|
    t.bigint "st_id"
    t.string "name", default: "New Chronicle"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["st_id"], name: "index_chronicles_on_st_id"
  end

  create_table "merits", id: :serial, force: :cascade do |t|
    t.integer "character_id"
    t.integer "rating", default: 1
    t.string "name", default: "New Merit"
    t.string "merit_name", default: ""
    t.string "merit_cat", default: "story"
    t.text "description", default: ""
    t.string "ref", default: "Core p.xyz"
    t.boolean "supernatural", default: false
    t.string "prereqs", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_merits_on_character_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "password_digest"
  end

  create_table "qc_attacks", force: :cascade do |t|
    t.bigint "qc_attackable_id"
    t.string "name", default: "New Attack"
    t.integer "pool", default: 1
    t.string "range", default: "close"
    t.integer "damage", default: 1
    t.integer "overwhelming", default: 1
    t.string "tags", array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "qc_attackable_type"
    t.index ["qc_attackable_id"], name: "index_qc_attacks_on_qc_attackable_id"
  end

  create_table "qc_charms", force: :cascade do |t|
    t.bigint "qc_id"
    t.string "name", default: "New QC Charm"
    t.string "cost", default: ""
    t.string "timing", default: "supplemental"
    t.string "duration", default: "instant"
    t.string "keywords", default: [], array: true
    t.integer "min_essence", default: 1
    t.text "body", default: ""
    t.string "ref", default: ""
    t.string "category", default: "miscellaneous"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["qc_id"], name: "index_qc_charms_on_qc_id"
  end

  create_table "qc_merits", id: :serial, force: :cascade do |t|
    t.integer "qc_id"
    t.string "name", default: "New Merit"
    t.boolean "latent", default: false
    t.boolean "magical", default: false
    t.text "body", default: ""
    t.string "ref", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["qc_id"], name: "index_qc_merits_on_qc_id"
  end

  create_table "qcs", id: :serial, force: :cascade do |t|
    t.string "name", default: "New QC"
    t.text "description", default: ""
    t.integer "essence", default: 1
    t.integer "willpower_temporary", default: 3
    t.integer "willpower_permanent", default: 3
    t.integer "motes_personal_total", default: 0
    t.integer "motes_peripheral_total", default: 0
    t.integer "motes_personal_current", default: 0
    t.integer "motes_peripheral_current", default: 0
    t.integer "health_level_0s", default: 1
    t.integer "health_level_1s", default: 2
    t.integer "health_level_2s", default: 2
    t.integer "health_level_4s", default: 1
    t.integer "health_level_incap", default: 1
    t.integer "damage_bashing", default: 0
    t.integer "damage_lethal", default: 0
    t.integer "damage_aggravated", default: 0
    t.integer "initiative", default: 0
    t.integer "onslaught", default: 0
    t.integer "join_battle", default: 1
    t.integer "movement", default: 1
    t.integer "soak", default: 1
    t.integer "hardness", default: 0
    t.integer "appearance", default: 1
    t.integer "resolve", default: 1
    t.integer "guile", default: 1
    t.integer "evasion", default: 1
    t.integer "parry", default: 1
    t.string "armor_name", default: ""
    t.json "actions", default: []
    t.string "ref", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "chronicle_id"
    t.integer "senses", default: 3
    t.integer "grapple", default: 0
    t.integer "grapple_control", default: 0
    t.json "ties", default: []
    t.json "principles", default: []
    t.index ["chronicle_id"], name: "index_qcs_on_chronicle_id"
    t.index ["player_id"], name: "index_qcs_on_player_id"
  end

  create_table "spells", force: :cascade do |t|
    t.bigint "character_id"
    t.string "name", default: "New Spell"
    t.string "cost", default: "0sm"
    t.string "circle", default: "emerald"
    t.string "keywords", default: [], array: true
    t.string "duration", default: "instant"
    t.text "body", default: ""
    t.string "ref", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_spells_on_character_id"
  end

  create_table "weapons", id: :serial, force: :cascade do |t|
    t.integer "character_id"
    t.string "name", default: "New Weapon"
    t.string "ability", default: "melee"
    t.string "weight", default: "light"
    t.string "tags", default: [], array: true
    t.boolean "is_artifact", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_weapons_on_character_id"
  end

  add_foreign_key "battlegroups", "chronicles"
  add_foreign_key "battlegroups", "players"
  add_foreign_key "characters", "chronicles"
  add_foreign_key "characters", "players"
  add_foreign_key "charms", "characters"
  add_foreign_key "chronicle_players", "chronicles"
  add_foreign_key "chronicle_players", "players"
  add_foreign_key "merits", "characters"
  add_foreign_key "qc_attacks", "qcs", column: "qc_attackable_id"
  add_foreign_key "qc_charms", "qcs"
  add_foreign_key "qc_merits", "qcs"
  add_foreign_key "qcs", "chronicles"
  add_foreign_key "qcs", "players"
  add_foreign_key "spells", "characters"
  add_foreign_key "weapons", "characters"
end
