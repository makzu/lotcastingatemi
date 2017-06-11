# frozen_string_literal: true

puts 'Reloading example player'
player1 = Player.find_or_initialize_by(id: 1)
player1.update(
  name: 'Example ST',
  email: 'solarShard179@IAM.net',
  password: 'praisethesun'
)

player2 = Player.find_or_initialize_by(id: 2)
player2.update(
  name: 'Example Player',
  email: 'solarShard259@IAM.net',
  password: 'password'
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
  puts 'Updated merit ' + merit.name + ' for ' + merit.character.name
end

puts 'Reloading weapons'
YAML.safe_load(File.read('db/seeds/weapons.yaml')).each do |w|
  weapon = Weapon.find_or_initialize_by(id: w['id'])
  weapon.update(w)
  puts 'Updated weapon ' + weapon.name + ' for ' + weapon.character.name
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

puts 'Reloading QC attacks'
YAML.safe_load(File.read('db/seeds/qc_attacks.yaml')).each do |a|
  attack = QcAttack.find_or_initialize_by(id: a['id'])
  attack.update(a)
  puts 'Updated QC Attack ' + attack.name + ' for ' + attack.qc.name
end

# Needed to prevent PG:UniqueViolation errors
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
