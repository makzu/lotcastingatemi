# frozen_string_literal: true

namespace :lca do
  desc 'Display aggregate stats for Discord announcements'
  task stats: :environment do
    puts '###################################################################'
    puts 'Today\'s LCA stats:'
    puts "* #{Identity.count} Players (#{Identity.where('updated_at < ?', 1.month.ago).count} recently logged in)"
    puts "* #{Chronicle.count} Chronicles"
    puts "* #{Character.count} Characters (#{Character.where(type: 'Character').count} Mortals, #{SolarCharacter.count} Solars, #{DragonbloodCharacter.count} DBs, #{CustomAbilityCharacter.count} Ability Exalts, #{CustomAttributeCharacter.count} Attribute Exalts, #{CustomEssenceCharacter.count} Essence Exalts)"
    puts "* #{Charm.count} Charms (#{Charms::AbilityCharm.count} Ability, #{Charms::AttributeCharm.count} Attribute, #{Charms::EssenceCharm.count} Essence, #{Charms::MartialArtsCharm.count} Martial Arts, #{Charms::SpiritCharm.count} Spirit, #{Charms::Evocation.count} Evocations)"
    puts "* #{Spell.count} Spells"
    puts "* #{Weapon.count} Weapons"
    puts "* #{Merit.count} Merits"
    puts "* #{Qc.count} QCs"
    puts "* #{Battlegroup.count} Battlegroups"
  end
end
