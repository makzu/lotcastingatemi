puts "updating Marnan"
marnan = Character.find_or_create_by(name: "Marnan Five-Sword")
marnan.update(
  description: "Five swords and one chip on his shoulder",

  attr_dexterity:    4, attr_strength:     2, attr_stamina:    3,
  attr_charisma:     2, attr_manipulation: 2, attr_appearance: 2,
  attr_intelligence: 2, attr_wits:         2, attr_perception: 3,

  willpower_temporary: 6,
  willpower_permanent: 6,

  abil_melee: 4,
  abil_brawl: 1,
  abil_dodge: 4,
  abil_awareness: 3,
  abil_integrity: 3,
  abil_resistance: 3,
  abil_presence: 2,
  abil_bureaucracy: 1,
  abil_investigation: 1,
  abil_linguistics: 1,
  abil_medicine: 1,
  abil_socialize: 1,
  abil_survival: 1,
  abil_war: 1,

  abil_craft: [
    { craft: "blacksmithing", rating: 1 }
  ],

  abil_martial_arts: [
    { style: "seven hand style", rating: 1 }
  ],

  specialties: [
    { ability: "Melee", context: "Swords" },
    { ability: "Melee", context: "Shields" },
    { ability: "Bureaucracy", context: "Satrapy Governments" },
    { ability: "Survival", context: "Tracking people" }
  ],

  ties: [
    { subject: "Enambris Rosen-Ash (Bittersweet respect)", rating: 3 }
  ],
  principles: [
    { subject: "I must do what I can to protect my city.", rating: 3 }
  ]
)

m = Merit.find_or_create_by(merit_name: "martial artist", character: marnan)
m.update(
  name: "martial artist",
  rating: 4,
  prereqs: "brawl 1",
  ref: "core p.163-164"
)
m = Merit.find_or_create_by(merit_name: "artifact", rating: 3, character: marnan)
m.update(
  name: "Marnan's Ancestral Sword"
)
m = Merit.find_or_create_by(merit_name: "quick draw", character: marnan)
m.update(
  name: "quick draw",
  rating: 4
)
m = Merit.find_or_create_by(merit_name: "fast reflexes", character: marnan)
m.update(
  name: "fast reflexes"
)
m = Merit.find_or_create_by(merit_name: "ambidextrous", rating: 1, character: marnan)
m = Merit.find_or_create_by(merit_name: "backing", character: marnan)
m.update(
  name: "Backing of the Ereden City Guard",
  rating: 2
)
m = Merit.find_or_create_by(merit_name: "resources", rating: 2, character: marnan)

m = Weapon.find_or_create_by(name: "Marnan's Ancestral sword", character: marnan)
m.update(
  weight: "medium",
  tags: ["lethal", "melee", "balanced"],
  ability: "melee",
  is_artifact: true
)
m = Weapon.find_or_create_by(name: "Marnan's Ancestral sword (seven hand style)", character: marnan)
m.update(
  weight: "medium",
  tags: ["lethal", "martial arts", "balanced"],
  ability: "martial arts (seven hand style)",
  is_artifact: true
)
m = Weapon.find_or_create_by(name: "Great sword", character: marnan)
m.update(
  weight: "heavy",
  ability: "melee",
  tags: ["lethal", "melee", "balanced", "reaching", "two-handed when on foot"]
)
m = Weapon.find_or_create_by(name: "Shortsword", character: marnan)
m.update(
  weight: "light",
  ability: "melee",
  tags: ["lethal", "melee", "balanced"]
)
m = Weapon.find_or_create_by(name: "Chopping sword", character: marnan)
m.update(
  weight: "medium",
  ability: "melee",
  tags: ["lethal", "melee", "chopping"]
)
m = Weapon.find_or_create_by(name: "straight sword", character: marnan)
m.update(
  weight: "medium",
  ability: "melee",
  tags: ["lethal", "melee", "balanced"]
)
andhisshield = Weapon.find_or_create_by(name: "Shield", character: marnan)
andhisshield.update(
  weight: "medium",
  ability: "melee",
  tags: ["bashing", "melee", "shield"]
)
m = Armor.find_or_create_by(name: "Ereden guard hauberk", character: marnan)
m.update(
  weight: "medium",
  equipped: true
)

#################################
puts 'Updating qc 1'
q = Qc.find_or_create_by(name: "Generic guardsman")
q.update(
  willpower_temporary: 4, willpower_permanent: 4,
  join_battle: 6, movement: 4,
  soak: 8, evasion: 2, parry: 4,
  appearance: 2, resolve: 2,

  health_level_1s: 1,

  actions: [
    { action: "senses", pool: 4 },
    { action: "threaten", pool: 4 }
  ]
)
qm = QcMerit.find_or_create_by(qc: q, name: "Call for Help")
qm.update(
  body: "Upon detecting intruders, she immediately lets out a cry that somehow manages to alert all other guards within a certain radius."
)
