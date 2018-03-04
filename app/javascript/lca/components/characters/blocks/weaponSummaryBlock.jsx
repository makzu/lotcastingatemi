import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities, fullWeapon } from '../../../utils/propTypes'

function WeaponHeader() {
  const padding = 'dense'

  return <TableRow>
    <TableCell padding={ padding }>Weapon Name</TableCell>
    <TableCell numeric padding={ padding }>Attack Pool</TableCell>
    <TableCell numeric padding={ padding }>Damage</TableCell>
    <TableCell numeric padding={ padding }>Parry</TableCell>
    <TableCell numeric padding={ padding }><abbr title="Overwhelming">Ovw</abbr></TableCell>
    <TableCell padding={ padding }>Tags</TableCell>
    <TableCell padding={ padding }>Ability</TableCell>
  </TableRow>
}

function WeaponData(props) {
  const { weapon, character } = props
  const padding = 'dense'

  return <TableRow>
    <TableCell padding={ padding }>{ weapon.name }</TableCell>
    <TableCell numeric padding={ padding }>
      { calc.witheringAttackPool(character, weapon) }{' '}
      ({ calc.decisiveAttackPool(character, weapon) } D)
    </TableCell>
    <TableCell numeric padding={ padding }>
      { calc.weaponDamage(character, weapon) }
      { calc.weaponDamageType(weapon) }
    </TableCell>
    <TableCell numeric padding={ padding }>
      { calc.weaponParry(character, weapon) }
    </TableCell>
    <TableCell numeric padding={ padding }>
      { calc.weaponOverwhelming(weapon) }
    </TableCell>
    <TableCell padding={ padding }>
      { weapon.tags.join(', ') }
    </TableCell>
    <TableCell padding={ padding }>
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
