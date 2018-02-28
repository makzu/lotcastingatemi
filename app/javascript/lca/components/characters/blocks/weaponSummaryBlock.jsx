import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities, fullWeapon } from '../../../utils/propTypes'

function WeaponHeader() {
  return <TableRow>
    <TableCell>Weapon Name</TableCell>
    <TableCell numeric>Attack Pool</TableCell>
    <TableCell numeric>Damage</TableCell>
    <TableCell numeric>Parry</TableCell>
    <TableCell numeric><abbr title="Overwhelming">Ovw</abbr></TableCell>
    <TableCell>Tags</TableCell>
    <TableCell>Ability</TableCell>
  </TableRow>
}

function WeaponData(props) {
  const { weapon, character } = props

  return <TableRow>
    <TableCell>{ weapon.name }</TableCell>
    <TableCell numeric>
      { calc.witheringAttackPool(character, weapon) }{' '}
      ({ calc.decisiveAttackPool(character, weapon) } D)
    </TableCell>
    <TableCell numeric>
      { calc.weaponDamage(character, weapon) }
      { calc.weaponDamageType(weapon) }
    </TableCell>
    <TableCell numeric>
      { calc.weaponParry(character, weapon) }
    </TableCell>
    <TableCell numeric>
      { calc.weaponOverwhelming(weapon) }
    </TableCell>
    <TableCell>
      { weapon.tags.join(', ') }
    </TableCell>
    <TableCell>
      { weapon.ability }
    </TableCell>
  </TableRow>
}
WeaponData.propTypes = {
  weapon: PropTypes.shape(fullWeapon),
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}

function WeaponSummaryBlock(props) {
  const { character, weapons } = props

  const weaps = weapons.map((weapon) =>
    <WeaponData key={ weapon.id } character={ character } weapon={ weapon } />
  )

  return <div>
    <Table>
      <TableHead>
        <WeaponHeader />
      </TableHead>
      <TableBody>
        { weaps }
      </TableBody>
    </Table>
  </div>
}

WeaponSummaryBlock.propTypes = {
  weapons: PropTypes.arrayOf(PropTypes.shape(fullWeapon)),
  character: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
}

export default WeaponSummaryBlock
