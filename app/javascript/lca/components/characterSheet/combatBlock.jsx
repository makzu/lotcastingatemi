import React from 'react'
import * as calc from '../../utils/calculated'


function WeaponData(props) {
  const { weapon, character } = props

  return(<tr>
    <td>{ weapon.name }</td>
    <td>{ calc.witheringAttackPool(character, weapon) } ({ calc.decisiveAttackPool(character, weapon) } decisive)</td>
    <td>{ calc.weaponDamage(character, weapon) }</td>
    <td>{ calc.weaponParry(character, weapon) }</td>
    <td>{ calc.weaponOverwhelming(weapon) }</td>
  </tr>)
}
// */

function CombatBlock(props) {
  const { character, weapons, merits } = props
  const naturalSoak = calc.naturalSoak(character)
  const armorSoak = calc.armorSoak(character)
  const weaps = weapons.map((weapon) =>
    <WeaponData key={weapon.id} character={character} weapon={weapon} />
  )

  return(<div>
    <p>Evasion: { calc.evasionRaw(character) }</p>
    <p>Soak: { naturalSoak + armorSoak } ({ armorSoak } from armor)</p>
    <p>Hardness: { calc.hardness(character) }</p>
    <p>Wound penalty: { calc.woundPenalty(character) }</p>
    <table>
      <thead><tr>
        <th>Name</th>
        <th>Attack pool</th>
        <th>Damage</th>
        <th>Parry</th>
        <th>Over.</th>
      </tr></thead>
      <tbody>
        { weaps }
      </tbody>
    </table>

    <p>Resolve: { calc.resolveRaw(character) }</p>
    <p>Guile:   { calc.guileRaw(character)   }</p>
  </div>)
}

export default CombatBlock
