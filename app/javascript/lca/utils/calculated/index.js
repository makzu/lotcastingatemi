/* Defense values (Parry is per-weapon and in weapons.js) */
import { ATTACK_ABILITIES, ABILITIES, ABILITIES_ALL } from '../constants.js'

export function evasionRaw(character) {
  return Math.ceil((character.attr_dexterity + character.abil_dodge) / 2)
}

export function guileRaw(character) {
  return Math.ceil((character.attr_manipulation + character.abil_socialize) / 2)
}

export function resolveRaw(character) {
  return Math.ceil((character.attr_wits + character.abil_integrity) / 2)
}

export function woundPenalty(character) {
  const totalDmg = character.damage_bashing + character.damage_lethal + character.damage_aggravated
  const lvl0 = character.health_level_0s
  const lvl1 = character.health_level_1s
  const lvl2 = character.health_level_2s
  const lvl4 = character.health_level_4s

  if (totalDmg <= lvl0) {
    return 0
  } else if (totalDmg <= (lvl0 + lvl1)) {
    return 1
  } else if (totalDmg <= (lvl0 + lvl1 + lvl2)) {
    return 2
  } else if (totalDmg <= (lvl0 + lvl1 + lvl2 + lvl4)) {
    return 4
  } else {
    return -1
  }
}

export function attackAbilities(character) {
  let abils = ATTACK_ABILITIES.filter((abil)=>character[abil] > 0).map(function(abil){
    let name = abil.substring(5)
    return { abil: name, rating: character[abil], specialties: character.specialties.filter((spec) => spec.ability == name)}
  })

  let mas = character.abil_martial_arts.map((abil)=> {
    let name = "martial arts (" + abil.style + ")"
    return { abil: name, rating: abil.rating }
  })

  return abils.concat(mas)
}

export function abilitiesWithRatings(character) {
  const abils = ABILITIES_ALL.filter((a) => {
    if (a.abil == "abil_craft" || a.abil == "abil_martial_arts")
      return character[a.abil].length >0
    else
      return character[a.abil] > 0
  })

  return abils
}

export function weaponAccuracyBonus(weapon) {
  // TODO: thrown/archery
  switch(weapon.weight) {
  case "light":
    return weapon.is_artifact ? 5 : 4
  case "medium":
    return weapon.is_artifact ? 3 : 2
  case "heavy":
    return weapon.is_artifact ? 1 : 0
  }
}

export function weaponDamageBonus(weapon) {
  // TODO: thrown/archery
  let damage = 0

  switch(weapon.weight) {
  case "light":
    damage = weapon.is_artifact ? 10 : 7
    break
  case "medium":
    damage = weapon.is_artifact ? 12 : 9
    break
  case "heavy":
    damage = weapon.is_artifact ? 14 : 11
    break
  }

  if (weapon.tags.includes("shield"))
    damage -= 2

  return damage
}

export function weaponDefenseBonus(weapon) {
  switch(weapon.weight) {
  case "light":
    return weapon.is_artifact ? 0 : 0
  case "medium":
    return weapon.is_artifact ? 1 : 1
  case "heavy":
    return weapon.is_artifact ? 0 : -1
  }
}

export function weaponDamage(character, weapon) {
  let damage = weaponDamageBonus(weapon)

  if (weapon.tags.includes("crossbow") || weapon.tags.includes("flame")) {
    damage += 4
  } else {
    damage += character.attr_strength
  }

  return damage
}

export function weaponOverwhelming(weapon) {
  if (! weapon.is_artifact)
    return 0
  switch(weapon.weight) {
  case "light":
    return 3
  case "medium":
    return 4
  case "heavy":
    return 5
  }
}

export function witheringAttackPool(character, weapon) {
  return decisiveAttackPool(character, weapon) + weaponAccuracyBonus(weapon)
}

export function decisiveAttackPool(character, weapon) {
  const ability = attackAbilities(character).find((abil) =>
    abil.abil == weapon.ability
  )
  if (ability == undefined)
    return character.attr_dexterity

  return character.attr_dexterity + ability.rating
}

export function weaponParry(character, weapon) {
  // TODO handle archery and thrown
  return Math.ceil(decisiveAttackPool(character, weapon) / 2) + weaponDefenseBonus(weapon)
}

export function currentArmor(character, armors) {
  const arm = armors.find((armor) => armor.equipped)
  if (arm == undefined) {
    return {
      name: "unarmored",
      weight: "unarmored",
      isArtifact: false,
      equipped: true,
      tags: []
    }
  } else {
    return arm
  }
}

export function armorMobilityPenalty(armor) {
  switch(armor.weight) {
  case "light":
  case "unarmored":
    return 0
  case "medium":
    return 1
  case "heavy":
    return 2
  default:
    return 0
  }
}

export function armorSoak(armor) {
  switch(armor.weight) {
  case "light":
    return armor.isArtifact ? 5 : 3
  case "medium":
    return armor.isArtifact ? 8 : 5
  case "heavy":
    return armor.isArtifact ? 11 : 7
  case "unarmored":
    return 0
  }
}
export function armorHardness(armor) {
  if (!armor.isArtifact)
    return 0
  switch(armor.weight) {
  case "light":
    return 4
  case "medium":
    return 7
  case "heavy":
    return 10
  }
}
