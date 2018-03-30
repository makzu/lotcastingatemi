# frozen_string_literal: true

# app/serializers/character_serializer.rb
class CharacterSerializer < ActiveModel::Serializer
  # rubocop:disable Layout/EmptyLinesAroundArguments
  attributes :id, :name, :essence, :description, :type,
             :willpower_temporary, :willpower_permanent,
             :health_level_0s, :health_level_1s, :health_level_2s,
             :health_level_4s, :health_level_incap,
             :damage_bashing, :damage_lethal, :damage_aggravated,

             :attr_strength,   :attr_dexterity,    :attr_stamina,
             :attr_charisma,   :attr_manipulation, :attr_appearance,
             :attr_perception, :attr_intelligence, :attr_wits,

             :abil_archery, :abil_athletics, :abil_awareness, :abil_brawl,
             :abil_bureaucracy, :abil_dodge, :abil_integrity, :abil_investigation,
             :abil_larceny, :abil_linguistics, :abil_lore, :abil_medicine, :abil_melee,
             :abil_occult, :abil_performance, :abil_presence, :abil_resistance,
             :abil_ride, :abil_sail, :abil_socialize, :abil_stealth, :abil_survival,
             :abil_thrown, :abil_war,

             :abil_craft, :abil_martial_arts,

             :specialties, :ties, :principles,

             :armor_name, :armor_weight, :armor_is_artifact, :armor_tags,

             :is_sorcerer, :sorcerous_motes, :shaping_rituals,

             :lore_background,

             :native_language,

             :initiative, :onslaught, :in_combat, :has_acted,

             :xp_total, :xp_spent, :xp_solar_total, :xp_solar_spent,
             :xp_craft_silver, :xp_craft_gold, :xp_craft_white,
             :sort_order, :chronicle_sort_order
  # rubocop:enable Layout/EmptyLinesAroundArguments

  attribute :player_id
  attribute :chronicle_id
  attribute :pinned, if: :owner?
  attribute :hidden, if: :owner_or_st?

  has_many :merits
  has_many :weapons
  has_many :spells

  def owner?
    object.player == current_player
  end

  def owner_or_st?
    owner? || (object.chronicle && object.storyteller == current_player)
  end
end
