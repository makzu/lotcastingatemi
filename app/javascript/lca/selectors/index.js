import { createSelector } from 'reselect'

const character = (state) => state.characters.characters

/*
function _weapons(character) {
  return {}
  const dex = character.attr_dexterity
  const str = character.attr_strength
  const archery = character.abil_archery
  const brawl = character.abil_brawl
  const melee = character.abil_melee
  const ma = character.abil_martial_arts
  const thrown = character.abil_thrown
  const init = character.initiative

  return character.weapons.map(function(weapon) {
    let witheringPool = 0
    let decisivePool = 0
    let damage = 0
    let overwhelming = 1
    let parry = 0

    let abl = weapon.ability
    witheringPool += dex
    decisivePool += dex

    if (abl.startsWith("martial arts"))
      abl = "martial arts"

    switch (abl) {

    case "melee":
      witheringPool += melee
      decisivePool += melee
      parry = Math.ceil(( dex + melee ) /2 )
      switch (weapon.weight) {
      case "light":
        if (weapon.is_artifact) {
          witheringPool += 5
          damage += 10
          overwhelming = 3
        } else {
          witheringPool += 4
          damage += 7
        }
        break
      case "medium":
        if (weapon.is_artifact) {
          witheringPool += 3
          damage += 12
          parry += 1
          overwhelming = 4
        } else {
          witheringPool += 2
          damage += 9
          parry += 1
        }
        break
      case "heavy":
        if (weapon.is_artifact) {
          witheringPool += 1
          damage += 14
          overwhelming = 5
        } else {
          witheringPool += 0
          damage += 11
          parry -= 1
        }
        break
      }
      break

    case "brawl":
      witheringPool += brawl
      decisivePool += brawl
      parry = Math.ceil(( dex + brawl ) /2 )
      switch (weapon.weight) {
      case "light":
        if (weapon.is_artifact) {
          witheringPool += 5
          damage += 10
          overwhelming = 3
        } else {
          witheringPool += 4
          damage += 7
        }
        break
      case "medium":
        if (weapon.is_artifact) {
          witheringPool += 3
          damage += 12
          parry += 1
          overwhelming = 4
        } else {
          witheringPool += 2
          damage += 9
          parry += 1
        }
        break
      case "heavy":
        if (weapon.is_artifact) {
          witheringPool += 1
          damage += 14
          overwhelming = 5
        } else {
          witheringPool += 0
          damage += 11
          parry -= 1
        }
        break
      }
      break

    case "martial arts":
      let sr = 0
      const _theMa = ma.find((art) =>
        weapon.ability.endsWith("(" + art.style + ")")
      )

      if (_theMa)
        sr = _theMa.rating

      const styleRating = parseInt(sr)

      witheringPool += styleRating
      decisivePool += styleRating
      parry = Math.ceil(( dex + styleRating ) /2 )
      switch (weapon.weight) {
      case "light":
        if (weapon.is_artifact) {
          witheringPool += 5
          damage += 10
          overwhelming = 3
        } else {
          witheringPool += 4
          damage += 7
        }
        break
      case "medium":
        if (weapon.is_artifact) {
          witheringPool += 3
          damage += 12
          parry += 1
          overwhelming = 4
        } else {
          witheringPool += 2
          damage += 9
          parry += 1
        }
        break
      case "heavy":
        if (weapon.is_artifact) {
          witheringPool += 1
          damage += 14
          overwhelming = 5
        } else {
          witheringPool += 0
          damage += 11
          parry -= 1
        }
        break
      }
      break
    }

    if (weapon.tags.includes("shield")) {
      damage -= 2
    }
    if (weapon.tags.includes("crossbow") || weapon.tags.includes("flame")) {
      damage += 4
    } else {
      damage += str
    }

    return {
      id: weapon.id,
      name: weapon.name,
      weight: weapon.weight,
      isArtifact: weapon.is_artifact,
      ability: abl,
      tags: weapon.tags,
      witheringPool: witheringPool,
      decisivePool: decisivePool,
      damage: damage,
      decisiveDamage: init,
      parry: parry,
      overwhelming: overwhelming
    }
  });
}
// */


export const computedValues = createSelector([character], (character) => {
})
