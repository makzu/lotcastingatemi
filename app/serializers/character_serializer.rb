# frozen_string_literal: true

# app/serializers/character_serializer.rb
class CharacterSerializer < PlayerAssetSerializer
  # rubocop:disable Layout/EmptyLinesAroundArguments
  attributes :name, :essence, :description,
             :willpower_temporary, :willpower_permanent,
             :health_level_0s, :health_level_1s, :health_level_2s,
             :health_level_4s, :health_level_incap,
             :damage_bashing, :damage_lethal, :damage_aggravated,

             :attr_strength,   :attr_dexterity,    :attr_stamina,
             :attr_charisma,   :attr_manipulation, :attr_appearance,
             :attr_perception, :attr_intelligence, :attr_wits,

             :abil_archery, :abil_athletics, :abil_awareness, :abil_brawl,
             :abil_bureaucracy, :abil_dodge, :abil_integrity,
             :abil_investigation, :abil_larceny, :abil_linguistics, :abil_lore,
             :abil_medicine, :abil_melee, :abil_occult, :abil_performance,
             :abil_presence, :abil_resistance, :abil_ride, :abil_sail,
             :abil_socialize, :abil_stealth, :abil_survival, :abil_thrown,
             :abil_war,
             :abil_craft, :abil_martial_arts,

             :specialties, :ties, :principles,

             :armor_name, :armor_weight, :armor_is_artifact, :armor_tags,

             :is_sorcerer, :sorcerous_motes, :rituals,

             :lore_background, :native_language,

             :resources,

             :bonus_hardness, :bonus_soak, :bonus_mobility_penalty,

             :xp_total, :xp_solar_total, :xp_log, :xp_log_solar, :bp_log,
             :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
             :notes, :equipment, :portrait_link
  # rubocop:enable Layout/EmptyLinesAroundArguments

  has_many :merits
  has_many :weapons
  has_many :spells
  has_many :poisons
end
