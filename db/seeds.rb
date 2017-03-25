# TODO move these to yaml files or something, sheesh

puts "updating example player"
player1 = Player.find_or_create_by(id: 1)
player1.update(
  name: "Example player",
  email: "solarShard179@IAM.net",
  password: "praisethesun"
)

puts "updating example chronicle"
exChronicle = Chronicle.find_or_create_by(id: 1)
exChronicle.update(
  name: "example mortals game",
  player: player1
)

puts "updating example character"

exChr = Character.find_or_create_by(id: 1)
exChr.update(
  name: "Vincible Sword Princess",
  description: "Exactly what it says on the tin.",

  player: player1,
  chronicle: exChronicle,

  attr_dexterity:    4, attr_strength:     2, attr_stamina:    3,
  attr_charisma:     2, attr_manipulation: 2, attr_appearance: 2,
  attr_intelligence: 2, attr_wits:         2, attr_perception: 3,

  willpower_temporary: 4,
  willpower_permanent: 6,

  damage_bashing: 2,
  damage_lethal: 1,
  damage_aggravated: 1,
  health_level_0s: 1, health_level_1s: 2, health_level_2s: 2,
  health_level_4s: 1, health_level_incap: 1,

  abil_melee: 5,
  abil_archery: 0,
  abil_awareness: 3,
  abil_brawl: 1,
  abil_bureaucracy: 2,
  abil_dodge: 4,
  abil_integrity: 3,
  abil_investigation: 2,
  abil_larceny: 0,
  abil_linguistics: 2,
  abil_lore: 1,
  abil_medicine: 0,
  abil_occult: 0,
  abil_resistance: 2,
  abil_presence: 2,
  abil_socialize: 4,
  abil_war: 2,

  abil_craft: [
    { craft: "weapon forging", rating: 3 }
  ],
  abil_martial_arts: [
    { style: "steel devil style", rating: 4 }
  ],

  specialties: [
    { ability: "dodge", context: "While surrounded" },
    { ability: "melee", context: "While surrounded" },
    { ability: "bureaucracy", context: "Official duties of a princess" },
    { ability: "socialize", context: "royal courts" },
    { ability: "craft", context: "her own weapons" }
  ],

  ties: [
    { subject: "My people (love)", rating: 3 },
    { subject: "Vincible Sword King, my father (love)", rating: 2 },
  ],

  principles: [
    { subject: "I must defend those that I love", rating: 3 }
  ],
  armor_weight: "medium",
  armor_name:   "Reinforced breastplate",
  onslaught: 0,
  initiative: 0
)

puts "updating example character merits"
m = Merit.find_or_create_by(id: 1, character: exChr)
m.update(
  name: "martial artist",
  merit_name: "martial artist",
  rating: 4,
  prereqs: "brawl 1",
  ref: "core p.163-164"
)
m = Merit.find_or_create_by(id: 2, character: exChr)
m.update(
  name: "royal stipend",
  merit_name: "resources",
  description: "The princess has some access to her kingdom's coffers",
  ref: "core p.164-165",
  rating: 2
)
m = Merit.find_or_create_by(id: 3, character: exChr)
m.update(
  name: "Ambidextrous",
  merit_name: "ambidextrous",
  rating: 1,
  ref: "core p.158-159"
)

puts "updating example character weapons"
m = Weapon.find_or_create_by(id: 1, character: exChr)
m.update(
  name: "Twin blades (paired)",
  weight: "medium",
  tags: ["lethal", "martial arts", "balanced"],
  ability: "martial arts (steel devil style)"
)
m = Weapon.find_or_create_by(id: 2, character: exChr)
m.update(
  name: "Stem (the left blade)",
  weight: "medium",
  tags: ["lethal", "melee", "balanced"],
  ability: "melee"
)
m = Weapon.find_or_create_by(id: 3, character: exChr)
m.update(
  name: "Blossom (the right blade)",
  weight: "medium",
  tags: ["lethal", "melee", "balanced"],
  ability: "melee"
)
m = Weapon.find_or_create_by(id: 4, character: exChr)
m.update(
  name: "Shield example",
  weight: "medium",
  ability: "melee",
  tags: ["bashing", "melee", "shield"]
)
m = Weapon.find_or_create_by(id: 5, character: exChr)
m.update(
  name: "Unarmed (brawl)",
  weight: "light",
  ability: "brawl",
  tags: ["bashing", "brawl", "grappling", "natural"]
)
m = Weapon.find_or_create_by(id: 6, character: exChr)
m.update(
  name: "Light Artifact example",
  weight: "light",
  ability: "brawl",
  is_artifact: true,
  tags: ["bashing", "brawl", "smashing"]
)

#################################
puts 'Updating qc 1'
q = Qc.find_or_create_by(id: 1)
q.update(
  name: "Vincible Shieldman",
  player: player1,
  chronicle: exChronicle,

  willpower_temporary: 4, willpower_permanent: 4,
  join_battle: 6, movement: 4,
  soak: 8, evasion: 2, parry: 4,
  appearance: 2, resolve: 2,

  health_level_0s: 1, health_level_1s: 1, health_level_2s: 2,
  health_level_4s: 1, health_level_incap: 1,

  damage_bashing: 0, damage_lethal: 0, damage_aggravated: 0,

  actions: [
    { action: "senses", pool: 4 },
    { action: "threaten", pool: 4 }
  ]
)
puts "Updating qc 1 merits"
qm = QcMerit.find_or_create_by(qc: q, id: 1)
qm.update(
  name: "Call for Help",
  body: "Upon detecting intruders, she immediately lets out a cry that somehow manages to alert all other guards within a certain radius."
)

puts 'Updating Qc 2'
q = Qc.find_or_create_by(id: 2)
q.update(
  name: "Tiny Demon",
  player: player1,
  chronicle: exChronicle,

  essence: 2,
  willpower_temporary: 3, willpower_permanent: 3,
  join_battle: 5, movement: 5,
  soak: 3, evasion: 3, parry: 3,
  appearance: 2, resolve: 2,

  motes_personal_total: 70,

  health_level_0s: 1, health_level_1s: 1, health_level_2s: 1,
  health_level_4s: 1, health_level_incap: 1,

  damage_bashing: 0, damage_lethal: 0, damage_aggravated: 0,

  actions: [
    { action: "senses", pool: 5 },
    { action: "stealth", pool: 6 },
    { action: "tracking", pool: 4 },
    { action: "whispering mean things", pool: 4 }
  ]
)
puts "Updating qc 2 merits"
qm = QcMerit.find_or_create_by(qc: q, id: 2)
qm.update(
  name: "Tiny Creature",
  body: "Tiny Demon gets +2 evasion against a larger foe."
)
