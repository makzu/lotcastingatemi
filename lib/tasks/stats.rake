# frozen_string_literal: true

namespace :lca do
  desc 'Display aggregate stats for Discord announcements'
  task stats: :environment do
    puts '###################################################################'
    puts 'Today\'s LCA stats:'
    puts "* #{Identity.count} Players (#{Identity.where('updated_at < ?', 1.month.ago).count} recently logged in)"
    puts "* #{Chronicle.count} Chronicles"
    puts "* #{Character.count} Characters (#{Character.where(type: 'Character').count} Mortals, #{SolarCharacter.count} Solars, #{DragonbloodCharacter.count} DBs, #{LunarCharacter.count} Lunars, #{CustomAbilityCharacter.count} Ability Exalts, #{CustomAttributeCharacter.count} Attribute Exalts, #{CustomEssenceCharacter.count} Essence Exalts)"
    puts "* #{Charm.count} Charms (#{Charms::AbilityCharm.count} Ability, #{Charms::AttributeCharm.count} Attribute, #{Charms::EssenceCharm.count} Essence, #{Charms::MartialArtsCharm.count} Martial Arts, #{Charms::SpiritCharm.count} Spirit, #{Charms::Evocation.count} Evocations)"
    puts "* #{Spell.count} Spells"
    puts "* #{Weapon.count} Weapons"
    puts "* #{Merit.count} Merits"
    puts "* #{Qc.count} QCs"
    puts "* #{Battlegroup.count} Battlegroups"
  end

  namespace :stats do
    desc 'Display CSV of how many characters/etc each player has'
    task players: :environment do
      puts 'id,chars,qcs,bgs,own_chronicles,chronicles'
      Player.find_each(batch_size: 50) do |player|
        puts "#{player.id},#{player.characters.count},#{player.qcs.count},#{player.battlegroups.count},#{player.own_chronicles.count},#{player.chronicles.count}"
      end
    end

    desc 'Display CSV of how many characters/etc each chronicle has'
    task chronicles: :environment do
      puts 'id,chars,qcs,bgs'
      Chronicle.find_each(batch_size: 50) do |chron|
        puts "#{chron.id},#{chron.characters.count},#{chron.qcs.count},#{chron.battlegroups.count}"
      end
    end
  end
end
