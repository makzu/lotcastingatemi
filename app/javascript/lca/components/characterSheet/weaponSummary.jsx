import React from 'react'
import Divider from 'material-ui/Divider'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import AllWeaponsPopup from './editors/allWeaponsPopup.jsx'

import * as calc from '../../utils/calculated'

function WeaponData(props) {
  const { weapon, character } = props

  return(<TableRow>
    <TableRowColumn>{ weapon.name }</TableRowColumn>
    <TableRowColumn className="attackPoolColumn">{ calc.witheringAttackPool(character, weapon) } ({ calc.decisiveAttackPool(character, weapon) } decisive)</TableRowColumn>
    <TableRowColumn className="damageColumn">{ calc.weaponDamage(character, weapon) } { calc.weaponDamageType(weapon) }</TableRowColumn>
    <TableRowColumn className="parryColumn">{ calc.weaponParry(character, weapon) }</TableRowColumn>
    <TableRowColumn className="overwhelmingColumn">{ calc.weaponOverwhelming(weapon) }</TableRowColumn>
    <TableRowColumn className="tagsColumn">{ weapon.tags.join(", ") }</TableRowColumn>
    <TableRowColumn className="abilityColumn">{ weapon.ability }</TableRowColumn>
  </TableRow>)
}

export default function WeaponSummary(props) {
  const { character, weapons } = props
  const weaps = weapons.map((weapon) =>
    <WeaponData key={weapon.id} character={character} weapon={weapon} />
  )

  return (<div className="weaponSummaryBlock">
    <h3>Weapons<AllWeaponsPopup character={ character } weapons={ weapons } /></h3>
    <Table className="weaponTable" selectable={ false }>
      <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
        <TableRow>
          <TableHeaderColumn>Weapon Name</TableHeaderColumn>
          <TableHeaderColumn className="attackPoolColumn">Attack Pool</TableHeaderColumn>
          <TableHeaderColumn className="damageColumn">Damage</TableHeaderColumn>
          <TableHeaderColumn className="parryColumn">Parry</TableHeaderColumn>
          <TableHeaderColumn className="overwhelmingColumn"><abbr title="Overwhelming">Ovw</abbr></TableHeaderColumn>
          <TableHeaderColumn>Tags</TableHeaderColumn>
          <TableHeaderColumn>Ability</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckboxes={ false }>
        { weaps }
      </TableBody>
    </Table>
  </div>)
}
