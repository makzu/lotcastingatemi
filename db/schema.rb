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

ActiveRecord::Schema.define(version: 20170321061251) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
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
    t.json "abil_craft"
    t.json "abil_martial_arts"
    t.json "ties"
    t.json "principles"
    t.json "specialties"
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
    t.text "shaping_rituals"
    t.string "native_language", default: "Riverspeak"
    t.text "lore_background"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "chronicle_id"
    t.index ["chronicle_id"], name: "index_characters_on_chronicle_id"
    t.index ["player_id"], name: "index_characters_on_player_id"
  end

  create_table "chronicles", force: :cascade do |t|
    t.bigint "player_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_chronicles_on_player_id"
  end

  create_table "merits", id: :serial, force: :cascade do |t|
    t.integer "character_id"
    t.integer "rating", default: 1
    t.string "name"
    t.string "merit_name"
    t.string "merit_cat", default: "story"
    t.text "description"
    t.string "ref"
    t.boolean "supernatural", default: false
    t.string "prereqs"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_merits_on_character_id"
  end

  create_table "players", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_players_on_confirmation_token", unique: true
    t.index ["email"], name: "index_players_on_email", unique: true
    t.index ["reset_password_token"], name: "index_players_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_players_on_uid_and_provider", unique: true
  end

  create_table "qc_merits", id: :serial, force: :cascade do |t|
    t.integer "qc_id"
    t.string "name"
    t.boolean "latent", default: false
    t.boolean "magical", default: false
    t.text "body"
    t.string "ref"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["qc_id"], name: "index_qc_merits_on_qc_id"
  end

  create_table "qcs", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
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
    t.string "armor_name"
    t.json "actions"
    t.string "ref"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "player_id"
    t.bigint "chronicle_id"
    t.index ["chronicle_id"], name: "index_qcs_on_chronicle_id"
    t.index ["player_id"], name: "index_qcs_on_player_id"
  end

  create_table "weapons", id: :serial, force: :cascade do |t|
    t.integer "character_id"
    t.string "name"
    t.string "ability"
    t.string "weight"
    t.string "tags", array: true
    t.boolean "is_artifact", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_id"], name: "index_weapons_on_character_id"
  end

  add_foreign_key "characters", "chronicles"
  add_foreign_key "characters", "players"
  add_foreign_key "merits", "characters"
  add_foreign_key "qc_merits", "qcs"
  add_foreign_key "qcs", "chronicles"
  add_foreign_key "qcs", "players"
  add_foreign_key "weapons", "characters"
end
