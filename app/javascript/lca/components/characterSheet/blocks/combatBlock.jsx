import React from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities } from '../../../utils/propTypes'

export function CombatBlock(props) {
  const { character } = props

  return <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric>Evasion</TableCell>

          <TableCell numeric>Join Battle</TableCell>
          <TableCell numeric>Rush</TableCell>
          <TableCell numeric>Disengage</TableCell>
          <TableCell numeric>Rise/Prone</TableCell>
          <TableCell numeric>Take Cover</TableCell>
          <TableCell numeric>Withdraw</TableCell>

        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell numeric>{ calc.evasionRaw(character) }</TableCell>

          <TableCell numeric>{ calc.joinBattlePool(character) }</TableCell>
          <TableCell numeric>{ calc.rushPool(character) }</TableCell>
          <TableCell numeric>{ calc.disengagePool(character) }</TableCell>
          <TableCell numeric>{ calc.riseFromPronePool(character) }</TableCell>
          <TableCell numeric>{ calc.takeCoverPool(character) }</TableCell>
          <TableCell numeric>{ calc.withdrawPool(character) }</TableCell>

        </TableRow>
      </TableBody>
    </Table>

  </div>
}
CombatBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}

export default CombatBlock
