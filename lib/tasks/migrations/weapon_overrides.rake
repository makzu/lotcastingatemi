# frozen_string_literal: true

namespace :lca do
  namespace :migrate do
    # Obsoleted columns: Weapon.attr, Weapon.damage_attr
    desc 'Move weapon pool data (attack attribute, etc) to new Overrides hash'
    task weapon_overrides: :environment do
      puts 'Migrating weapons...'
      Weapon.find_each do |weapon|
        weapon.overrides[:damage_attribute] = { use: weapon.damage_attr } unless weapon.damage_attr == 'strength'
        unless weapon.attr == 'dexterity'
          weapon.overrides[:attack_attribute] = { use: weapon.attr }
          weapon.overrides[:defense_attribute] = { use: weapon.attr }
        end
        weapon.save
      end
    end
  end
end
