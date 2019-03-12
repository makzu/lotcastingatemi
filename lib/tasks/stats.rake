# frozen_string_literal: true

namespace :lca do
  desc 'Display aggregate stats for Discord announcements'
  task stats: :environment do
    puts '###################################################################'
    puts 'Today\'s LCA stats:'
    puts "* #{Identity.count} Players \
(#{Identity.where('updated_at < ?', 1.month.ago).count} recently logged in)"
    puts "* #{Chronicle.count} Chronicles"

    puts "* #{Character.count} Characters (\
#{Character.where(type: 'Character').count} Mortals, \
#{SolarCharacter.count} Solars, \
#{DragonbloodCharacter.count} DBs, \
#{LunarCharacter.count} Lunars, \
#{CustomAbilityCharacter.count} Ability Exalts, \
#{CustomAttributeCharacter.count} Attribute Exalts, \
#{CustomEssenceCharacter.count} Essence Exalts)"

    puts "* #{Charm.count} Charms (\
#{Charms::AbilityCharm.count} Ability, \
#{Charms::AttributeCharm.count} Attribute, \
#{Charms::EssenceCharm.count} Essence, \
#{Charms::MartialArtsCharm.count} Martial Arts, \
#{Charms::SpiritCharm.count} Spirit, \
#{Charms::Evocation.count} Evocations)"

    puts "* #{Spell.count} Spells 🧙🏽‍♀️"
    puts "* #{Weapon.count} Weapons ⚔️"
    puts "* #{Merit.count} Merits"
    puts "* #{Qc.count} QCs"
    puts "* #{Battlegroup.count} Battlegroups"
  end

  namespace :stats do
    desc 'Display CSV of how many characters/etc each player has'
    task players: :environment do
      puts 'id,chars,qcs,bgs,own_chronicles,chronicles'
      Player.find_each(batch_size: 50) do |player|
        puts "#{player.id},\
#{player.characters.count},\
#{player.qcs.count},\
#{player.battlegroups.count},\
#{player.own_chronicles.count},\
#{player.chronicles.count}"
      end
    end

    desc 'Display CSV of how many characters/etc each chronicle has'
    task chronicles: :environment do
      puts 'id,chars,qcs,bgs'
      Chronicle.find_each(batch_size: 50) do |chron|
        puts "#{chron.id},\
#{chron.characters.count},\
#{chron.qcs.count},\
#{chron.battlegroups.count}"
      end
    end

    desc 'Display CSVs of craft ratings by craft and rating'
    task craft: :environment do
      craft_hash = {}
      rating_hash = {}
      Character.find_each(batch_size: 50) do |character|
        character.abil_craft.each do |craft|
          cr = craft['craft'].downcase.strip
          rating = craft['rating']
          craft_hash[cr] = (craft_hash[cr] || 0) + 1
          rating_hash[rating] = (rating_hash[rating] || 0) + 1
        end
      end
      puts 'craft,count'
      craft_hash.each do |craft, count|
        puts "#{craft},#{count}"
      end
      puts '------------------------------------'
      puts 'rating,count'
      rating_hash.each do |rating, count|
        puts "#{rating},#{count}"
      end
    end

    desc 'Display CSVs of martial ratings by style and rating'
    task ma: :environment do
      ma_hash = {}
      rating_hash = {}
      Character.find_each(batch_size: 50) do |character|
        character.abil_martial_arts.each do |art|
          ma = art['style'].downcase.strip
          rating = art['rating']
          ma_hash[ma] = (ma_hash[ma] || 0) + 1
          rating_hash[rating] = (rating_hash[rating] || 0) + 1
        end
      end
      puts 'style,count'
      ma_hash.each do |style, count|
        puts "#{style},#{count}"
      end
      puts '------------------------------------'
      puts 'rating,count'
      rating_hash.each do |rating, count|
        puts "#{rating},#{count}"
      end
    end

    desc 'Display CSV of exalt types by count'
    task exalt_types: :environment do
      type_hash = {}
      [CustomAbilityCharacter, CustomAttributeCharacter, CustomEssenceCharacter].each do |custom|
        custom.find_each(batch_size: 50) do |character|
          tipe = character.exalt_type.downcase.strip
          type_hash[tipe] = (type_hash[tipe] || 0) + 1
        end
      end

      puts 'type,count'
      type_hash.each do |type, count|
        puts "#{type},#{count}"
      end
    end

    desc 'Display CSV of Charm Attributes/Abilities by count'
    task charm_abilities: :environment do
      abil_hash = {}
      Charm.find_each(batch_size: 50) do |charm|
        abil = charm.ability
        abil_hash[abil] = (abil_hash[abil] || 0) + 1 unless charm.ability.blank?
      end

      puts 'ability,count'
      abil_hash.each do |abil, count|
        puts "#{abil},#{count}"
      end
    end
  end
end
