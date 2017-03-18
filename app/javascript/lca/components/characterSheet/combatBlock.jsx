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
  const { character, weapons, armors, merits } = props
  const currentArmor = calc.currentArmor(character, armors)
  const soak = character.attr_stamina + calc.armorSoak(currentArmor)
  const weaps = weapons.map((weapon) =>
    <WeaponData key={weapon.id} character={character} weapon={weapon} />
  )

  return(<div>
    <p>Evasion: { calc.evasionRaw(character) }</p>
    <p>Soak: { soak }</p>
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
