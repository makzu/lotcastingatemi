# frozen_string_literal: true

puts 'Reloading example players'
player1 = Player.find_or_initialize_by(id: 1)
player1.update(
  display_name: 'Example ST',
  email: 'solarShard179@IAM.net'
)

player2 = Player.find_or_initialize_by(id: 2)
player2.update(
  display_name: 'Example Player',
  email: 'solarShard259@IAM.net'
)

puts 'Reloading example chronicle'
chronicle1 = Chronicle.find_or_initialize_by(id: 1)
chronicle1.update(
  name: 'Example game',
  st: player1
)

pc = ChroniclePlayer.find_or_initialize_by(id: 1)
pc.update(
  player: player2,
  chronicle: chronicle1
)

puts 'Reloading characters'
YAML.safe_load(File.read('db/seeds/characters.yaml')).each do |c|
  character = Character.find_or_initialize_by(id: c['id'])
  character.update(c)
  puts 'Updated ' + character.name
end

puts 'Reloading merits'
YAML.safe_load(File.read('db/seeds/merits.yaml')).each do |m|
  merit = Merit.find_or_initialize_by(id: m['id'])
  merit.update(m)
  puts 'Updated merit ' + (merit.label || merit.merit_name) + ' for ' + merit.character.name
end

puts 'Reloading weapons'
YAML.safe_load(File.read('db/seeds/weapons.yaml')).each do |w|
  weapon = Weapon.find_or_initialize_by(id: w['id'])
  weapon.update(w)
  puts 'Updated weapon ' + weapon.name + ' for ' + weapon.character.name
end

puts 'Reloading Charms'
YAML.safe_load(File.read('db/seeds/charms.yaml')).each do |c|
  charm = Charm.find_or_initialize_by(id: c['id'])
  charm.update(c)
  puts "Updated #{charm.type} #{charm.name} for #{charm.character.name}"
end

puts 'Reloading QCs'
YAML.safe_load(File.read('db/seeds/qcs.yaml')).each do |q|
  qc = Qc.find_or_initialize_by(id: q['id'])
  qc.update(q)
  puts 'Updated QC ' + qc.name
end

puts 'Reloading QC merits'
YAML.safe_load(File.read('db/seeds/qc_merits.yaml')).each do |m|
  merit = QcMerit.find_or_initialize_by(id: m['id'])
  merit.update(m)
  puts 'Updated QC Merit ' + merit.name + ' for ' + merit.qc.name
end

puts 'Reloading QC Charms'
YAML.safe_load(File.read('db/seeds/qc_charms.yaml')).each do |c|
  charm = QcCharm.find_or_initialize_by(id: c['id'])
  charm.update(c)
  puts 'Updated QC Charm ' + charm.name + ' for ' + charm.qc.name
end

puts 'Reloading Battlegroups'
YAML.safe_load(File.read('db/seeds/battlegroups.yaml')).each do |a|
  battlegroup = Battlegroup.find_or_initialize_by(id: a['id'])
  battlegroup.update(a)
  puts "Updated Battlegroup #{battlegroup.name}"
end

puts 'Reloading QC attacks'
YAML.safe_load(File.read('db/seeds/qc_attacks.yaml')).each do |a|
  attack = QcAttack.find_or_initialize_by(id: a['id'])
  attack.update(a)
  puts "Updated QC Attack #{attack.name} for #{attack.qc_attackable.name}"
end

# Needed to prevent PG:UniqueViolation errors
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
