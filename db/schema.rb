# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_02_19_214926) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "battlegroups", force: :cascade do |t|
    t.integer "appearance", default: 1
    t.string "armor_name", default: ""
    t.bigint "chronicle_id"
    t.integer "chronicle_sort_order", default: 0
    t.integer "chronicle_sorting"
    t.datetime "created_at", precision: nil, null: false
    t.text "description", default: ""
    t.integer "drill", default: 1
    t.integer "essence", default: 1
    t.integer "evasion", default: 1
    t.integer "guile", default: 1
    t.integer "hardness", default: 0
    t.boolean "has_acted", default: false
    t.integer "health_levels", default: 7
    t.boolean "hidden", default: false
    t.boolean "in_combat", default: false
    t.integer "initiative", default: 0
    t.integer "join_battle", default: 1
    t.integer "magnitude", default: 8
    t.integer "might", default: 0
    t.integer "movement", default: 1
    t.string "name", default: "New Battlegroup"
    t.integer "onslaught", default: 0
    t.integer "parry", default: 1
    t.boolean "perfect_morale", default: false
    t.boolean "pinned", default: false
    t.bigint "player_id"
    t.string "portrait_link"
    t.boolean "public", default: false
    t.integer "resolve", default: 1
    t.integer "senses", default: 1
    t.integer "size", default: 1
    t.integer "soak", default: 1
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.datetime "updated_at", precision: nil, null: false
    t.integer "willpower_permanent", default: 3
    t.integer "willpower_temporary", default: 3
    t.index ["chronicle_id"], name: "index_battlegroups_on_chronicle_id"
    t.index ["player_id"], name: "index_battlegroups_on_player_id"
  end

  create_table "characters", id: :serial, force: :cascade do |t|
    t.integer "abil_archery", default: 0
    t.integer "abil_athletics", default: 0
    t.integer "abil_awareness", default: 0
    t.integer "abil_brawl", default: 0
    t.integer "abil_bureaucracy", default: 0
    t.json "abil_craft", default: []
    t.integer "abil_dodge", default: 0
    t.integer "abil_integrity", default: 0
    t.integer "abil_investigation", default: 0
    t.integer "abil_larceny", default: 0
    t.integer "abil_linguistics", default: 0
    t.integer "abil_lore", default: 0
    t.json "abil_martial_arts", default: []
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
    t.string "active_form", default: "base"
    t.string "active_loadout"
    t.string "anima_display", default: ""
    t.integer "anima_level", default: 0
    t.string "anima_powers", default: [], array: true
    t.boolean "armor_is_artifact", default: false
    t.string "armor_name", default: "unarmored"
    t.string "armor_tags", default: [], array: true
    t.string "armor_weight", default: "unarmored"
    t.boolean "aspect", default: false
    t.integer "attr_appearance", default: 1
    t.integer "attr_charisma", default: 1
    t.integer "attr_dexterity", default: 1
    t.integer "attr_intelligence", default: 1
    t.integer "attr_manipulation", default: 1
    t.integer "attr_perception", default: 1
    t.integer "attr_stamina", default: 1
    t.integer "attr_strength", default: 1
    t.integer "attr_wits", default: 1
    t.string "aura", default: ""
    t.jsonb "base_pool_overrides", default: {}
    t.integer "bonus_hardness", default: 0
    t.integer "bonus_mobility_penalty", default: 0
    t.integer "bonus_soak", default: 0
    t.jsonb "bonuses", default: []
    t.json "bp_log", default: []
    t.string "caste"
    t.string "caste_abilities", default: [], array: true
    t.string "caste_attributes", default: [], array: true
    t.bigint "chronicle_id"
    t.integer "chronicle_sort_order", default: 0
    t.integer "chronicle_sorting"
    t.datetime "created_at", precision: nil, null: false
    t.integer "damage_aggravated", default: 0
    t.integer "damage_bashing", default: 0
    t.integer "damage_lethal", default: 0
    t.text "description", default: ""
    t.text "equipment"
    t.integer "essence", default: 1
    t.string "exalt_type", default: "Mortal"
    t.string "excellencies_for", default: [], array: true
    t.string "excellency", default: ""
    t.string "excellency_stunt", default: ""
    t.string "favored_abilities", default: [], array: true
    t.string "favored_attributes", default: [], array: true
    t.json "forms", default: []
    t.boolean "has_acted", default: false
    t.integer "health_level_0s", default: 1
    t.integer "health_level_1s", default: 2
    t.integer "health_level_2s", default: 2
    t.integer "health_level_4s", default: 1
    t.integer "health_level_incap", default: 1
    t.boolean "hidden", default: false
    t.boolean "houserules", default: false
    t.boolean "in_combat", default: false
    t.integer "initiative", default: 0
    t.boolean "is_necromancer", default: false
    t.boolean "is_sorcerer", default: false
    t.integer "limit"
    t.string "limit_trigger"
    t.text "lore_background", default: ""
    t.json "motes_committed", default: []
    t.integer "motes_peripheral_current", default: 0
    t.integer "motes_peripheral_total", default: 0
    t.integer "motes_personal_current", default: 0
    t.integer "motes_personal_total", default: 0
    t.string "name", default: "New Character"
    t.string "native_language", default: "Riverspeak"
    t.integer "necromantic_motes", default: 0
    t.text "notes", default: ""
    t.integer "onslaught", default: 0
    t.boolean "pinned", default: false
    t.bigint "player_id"
    t.string "portrait_link", default: ""
    t.json "principles", default: []
    t.boolean "public", default: false
    t.json "resources", default: []
    t.string "rituals", default: [], array: true
    t.text "shaping_rituals", default: ""
    t.integer "sorcerous_motes", default: 0
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.json "specialties", default: []
    t.string "supernal_ability"
    t.string "tell", default: ""
    t.json "ties", default: []
    t.string "totem", default: ""
    t.string "type"
    t.datetime "updated_at", precision: nil, null: false
    t.integer "willpower_permanent", default: 3
    t.integer "willpower_temporary", default: 3
    t.integer "xp_craft_gold", default: 0
    t.integer "xp_craft_silver", default: 0
    t.integer "xp_craft_white", default: 0
    t.json "xp_log", default: []
    t.json "xp_log_solar", default: []
    t.integer "xp_solar_spent", default: 0
    t.integer "xp_solar_total", default: 0
    t.integer "xp_spent", default: 0
    t.integer "xp_total", default: 0
    t.index ["chronicle_id"], name: "index_characters_on_chronicle_id"
    t.index ["player_id"], name: "index_characters_on_player_id"
  end

  create_table "charms", force: :cascade do |t|
    t.string "ability"
    t.string "artifact_name"
    t.text "body", default: ""
    t.string "categories", default: [], array: true
    t.bigint "character_id"
    t.string "character_type"
    t.string "cost", default: "0m"
    t.datetime "created_at", precision: nil, null: false
    t.string "duration", default: "instant"
    t.string "keywords", default: [], array: true
    t.string "loadouts", default: [], array: true
    t.integer "min_ability"
    t.integer "min_essence", default: 1
    t.string "name", default: "New Charm"
    t.string "prereqs", default: "none"
    t.string "ref", default: ""
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.string "style"
    t.string "summary", default: ""
    t.string "timing", default: "reflexive"
    t.string "type"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["character_id"], name: "index_charms_on_character_id"
  end

  create_table "chronicle_players", force: :cascade do |t|
    t.bigint "chronicle_id"
    t.datetime "created_at", precision: nil, null: false
    t.bigint "player_id"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["chronicle_id"], name: "index_chronicle_players_on_chronicle_id"
    t.index ["player_id"], name: "index_chronicle_players_on_player_id"
  end

  create_table "chronicles", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "invite_code"
    t.string "name", default: "New Chronicle"
    t.text "notes", default: ""
    t.bigint "st_id"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["invite_code"], name: "index_chronicles_on_invite_code", unique: true
    t.index ["st_id"], name: "index_chronicles_on_st_id"
  end

  create_table "combat_actors", force: :cascade do |t|
    t.bigint "actor_id"
    t.string "actor_type"
    t.integer "anima_level", default: 0
    t.bigint "chronicle_id"
    t.datetime "created_at", precision: nil, null: false
    t.integer "damage_aggravated", default: 0
    t.integer "damage_bashing", default: 0
    t.integer "damage_lethal", default: 0
    t.boolean "has_acted", default: false
    t.integer "initiative", default: 0
    t.integer "motes_peripheral_current", default: 0
    t.integer "motes_personal_current", default: 0
    t.string "name", default: ""
    t.integer "onslaught", default: 0
    t.bigint "player_id"
    t.datetime "updated_at", precision: nil, null: false
    t.integer "willpower_temporary", default: 0
    t.index ["actor_type", "actor_id"], name: "index_combat_actors_on_actor_type_and_actor_id"
    t.index ["chronicle_id"], name: "index_combat_actors_on_chronicle_id"
    t.index ["player_id"], name: "index_combat_actors_on_player_id"
  end

  create_table "identities", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "email"
    t.datetime "expires_at", precision: nil
    t.string "image"
    t.string "name"
    t.bigint "player_id"
    t.string "provider"
    t.string "refresh_token"
    t.string "token"
    t.string "uid"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["player_id"], name: "index_identities_on_player_id"
  end

  create_table "merits", id: :serial, force: :cascade do |t|
    t.integer "character_id"
    t.datetime "created_at", precision: nil, null: false
    t.text "description", default: ""
    t.string "forms", default: [], array: true
    t.string "label", default: ""
    t.string "merit_cat", default: "story"
    t.string "merit_name", default: "New Merit"
    t.boolean "mutation", default: false
    t.string "prereqs", default: ""
    t.integer "rating", default: 1
    t.string "ref", default: "Core p.157-169"
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.boolean "supernatural", default: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["character_id"], name: "index_merits_on_character_id"
  end

  create_table "players", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.string "display_name"
    t.string "email"
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "poisons", force: :cascade do |t|
    t.string "crash_damage_type", default: "x"
    t.datetime "created_at", precision: nil, null: false
    t.integer "damage", default: 1
    t.string "damage_type", default: "i"
    t.integer "duration", default: 1
    t.string "duration_type", default: "rounds"
    t.string "interval", default: "rounds"
    t.string "name", default: ""
    t.text "notes", default: ""
    t.integer "penalty", default: 0
    t.bigint "poisonable_id"
    t.string "poisonable_type"
    t.string "ref", default: ""
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.datetime "updated_at", precision: nil, null: false
    t.string "vector", default: ""
    t.index ["poisonable_type", "poisonable_id"], name: "index_poisons_on_poisonable_type_and_poisonable_id"
  end

  create_table "qc_attacks", force: :cascade do |t|
    t.datetime "created_at", precision: nil, null: false
    t.integer "damage", default: 1
    t.string "name", default: "New Attack"
    t.integer "overwhelming", default: 1
    t.integer "pool", default: 1
    t.bigint "qc_attackable_id"
    t.string "qc_attackable_type"
    t.string "range", default: "close"
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.string "tags", default: [], array: true
    t.datetime "updated_at", precision: nil, null: false
    t.index ["qc_attackable_id"], name: "index_qc_attacks_on_qc_attackable_id"
  end

  create_table "qc_charms", force: :cascade do |t|
    t.text "body", default: ""
    t.string "category", default: "miscellaneous"
    t.string "cost", default: "0m"
    t.datetime "created_at", precision: nil, null: false
    t.string "duration", default: "instant"
    t.string "keywords", default: [], array: true
    t.integer "min_essence", default: 1
    t.string "name", default: "New QC Charm"
    t.bigint "qc_id"
    t.string "ref", default: ""
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.string "timing", default: "reflexive"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["qc_id"], name: "index_qc_charms_on_qc_id"
  end

  create_table "qc_merits", id: :serial, force: :cascade do |t|
    t.text "body", default: ""
    t.datetime "created_at", precision: nil, null: false
    t.boolean "latent", default: false
    t.boolean "magical", default: false
    t.string "name", default: "New Merit"
    t.integer "qc_id"
    t.string "ref", default: ""
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["qc_id"], name: "index_qc_merits_on_qc_id"
  end

  create_table "qcs", id: :serial, force: :cascade do |t|
    t.json "actions", default: []
    t.string "anima_display", default: ""
    t.integer "anima_level", default: 0
    t.integer "appearance", default: 1
    t.string "armor_name", default: ""
    t.string "aura", default: ""
    t.string "categories", default: [], array: true
    t.bigint "chronicle_id"
    t.integer "chronicle_sort_order", default: 0
    t.integer "chronicle_sorting"
    t.datetime "created_at", precision: nil, null: false
    t.integer "damage_aggravated", default: 0
    t.integer "damage_bashing", default: 0
    t.integer "damage_lethal", default: 0
    t.text "description", default: ""
    t.integer "essence", default: 1
    t.integer "evasion", default: 1
    t.string "excellency", default: ""
    t.integer "feats_of_strength", default: 0
    t.integer "grapple", default: 0
    t.integer "grapple_control", default: 0
    t.integer "guile", default: 1
    t.integer "hardness", default: 0
    t.boolean "has_acted", default: false
    t.integer "health_level_0s", default: 1
    t.integer "health_level_1s", default: 2
    t.integer "health_level_2s", default: 2
    t.integer "health_level_4s", default: 1
    t.integer "health_level_incap", default: 1
    t.boolean "hidden", default: false
    t.boolean "in_combat", default: false
    t.integer "initiative", default: 0
    t.boolean "is_sorcerer", default: false
    t.integer "join_battle", default: 1
    t.json "motes_committed", default: []
    t.integer "motes_peripheral_current", default: 0
    t.integer "motes_peripheral_total", default: 0
    t.integer "motes_personal_current", default: 0
    t.integer "motes_personal_total", default: 0
    t.integer "movement", default: 1
    t.string "name", default: "New QC"
    t.text "notes", default: ""
    t.integer "onslaught", default: 0
    t.integer "parry", default: 1
    t.boolean "pinned", default: false
    t.bigint "player_id"
    t.string "portrait_link"
    t.json "principles", default: []
    t.boolean "public", default: false
    t.string "ref", default: ""
    t.integer "resolve", default: 1
    t.json "resources", default: []
    t.string "rituals", default: [], array: true
    t.integer "senses", default: 3
    t.integer "shape_sorcery", default: 0
    t.integer "soak", default: 1
    t.integer "sorcerous_motes", default: 0
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.integer "strength", default: 0
    t.json "ties", default: []
    t.datetime "updated_at", precision: nil, null: false
    t.integer "willpower_permanent", default: 3
    t.integer "willpower_temporary", default: 3
    t.index ["chronicle_id"], name: "index_qcs_on_chronicle_id"
    t.index ["player_id"], name: "index_qcs_on_player_id"
  end

  create_table "spells", force: :cascade do |t|
    t.text "body", default: ""
    t.string "categories", default: [], array: true
    t.string "circle", default: "terrestrial"
    t.boolean "control", default: false
    t.string "cost", default: "0sm, 1wp"
    t.datetime "created_at", precision: nil, null: false
    t.string "duration", default: "instant"
    t.string "keywords", default: [], array: true
    t.string "name", default: "New Spell"
    t.string "ref", default: ""
    t.bigint "sorcerer_id"
    t.string "sorcerer_type"
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.datetime "updated_at", precision: nil, null: false
    t.index ["sorcerer_id"], name: "index_spells_on_sorcerer_id"
  end

  create_table "weapons", id: :serial, force: :cascade do |t|
    t.string "ability", default: "melee"
    t.string "attr", default: "dexterity"
    t.integer "bonus_accuracy", default: 0
    t.integer "bonus_damage", default: 0
    t.integer "bonus_defense", default: 0
    t.integer "bonus_overwhelming", default: 0
    t.integer "character_id"
    t.datetime "created_at", precision: nil, null: false
    t.string "damage_attr", default: "strength"
    t.boolean "is_artifact", default: false
    t.string "name", default: "New Weapon"
    t.text "notes", default: ""
    t.jsonb "overrides", default: {}
    t.integer "sort_order", default: 0
    t.integer "sorting"
    t.string "tags", default: [], array: true
    t.datetime "updated_at", precision: nil, null: false
    t.string "weight", default: "light"
    t.index ["character_id"], name: "index_weapons_on_character_id"
  end

  add_foreign_key "battlegroups", "chronicles"
  add_foreign_key "battlegroups", "players"
  add_foreign_key "characters", "chronicles"
  add_foreign_key "characters", "players"
  add_foreign_key "charms", "characters"
  add_foreign_key "chronicle_players", "chronicles"
  add_foreign_key "chronicle_players", "players"
  add_foreign_key "combat_actors", "chronicles"
  add_foreign_key "combat_actors", "players"
  add_foreign_key "identities", "players"
  add_foreign_key "merits", "characters"
  add_foreign_key "qc_charms", "qcs"
  add_foreign_key "qc_merits", "qcs"
  add_foreign_key "qcs", "chronicles"
  add_foreign_key "qcs", "players"
  add_foreign_key "weapons", "characters"
end
