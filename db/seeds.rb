
puts "Reloading example player"
player1 = Player.find_or_create_by(id: 1)
player1.update(
  name: "Example player",
  email: "solarShard179@IAM.net",
  password: "praisethesun"
)

puts "Reloading example chronicle"
exChronicle = Chronicle.find_or_create_by(id: 1)
exChronicle.update(
  name: "Example game",
  player: player1
)

puts "Reloading characters"
YAML.load(File.read("db/seeds/characters.yaml")).each do |c|
  character = Character.find_or_create_by(id: c["id"])
  character.update(c)
  puts "Updated " + character.name
end

puts "Reloading merits"
YAML.load(File.read("db/seeds/merits.yaml")).each do |m|
  merit = Merit.find_or_create_by(id: m["id"])
  merit.update(m)
  puts "Updated " + merit.name + " for " + merit.character.name
end

puts "Reloading weapons"
YAML.load(File.read("db/seeds/weapons.yaml")).each do |w|
  weapon = Weapon.find_or_create_by(id: w["id"])
  weapon.update(w)
  puts "Updated " + weapon.name + " for " + weapon.character.name
end

puts "Reloading QCs"
YAML.load(File.read("db/seeds/qcs.yaml")).each do |q|
  qc = Qc.find_or_create_by(id: q["id"])
  qc.update(q)
  puts "Updated " + qc.name
end

puts "Reloading QC merits"
YAML.load(File.read("db/seeds/qc_merits.yaml")).each do |m|
  merit = QcMerit.find_or_create_by(id: m["id"])
  merit.update(m)
  puts "Updated " + merit.name + " for " + merit.qc.name
end

puts "Reloading QC attacks"
YAML.load(File.read("db/seeds/qc_attacks.yaml")).each do |a|
  attack = QcAttack.find_or_create_by(id: a["id"])
  attack.update(a)
  puts "Updated " + attack.name + " for " + attack.qc.name
end
