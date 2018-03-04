import React from 'react'
import PropTypes from 'prop-types'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities } from '../../../utils/propTypes'

export function CombatBlock(props) {
  const { character } = props
  const padding = 'dense'

  return <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric padding={ padding }>Evasion</TableCell>
          <TableCell numeric padding={ padding }>Join Battle</TableCell>
          <TableCell numeric padding={ padding }>Rush</TableCell>
          <TableCell numeric padding={ padding }>Disengage</TableCell>
          <TableCell numeric padding={ padding }>Rise/Prone</TableCell>
          <TableCell numeric padding={ padding }>Take Cover</TableCell>
          <TableCell numeric padding={ padding }>Withdraw</TableCell>

        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell numeric padding={ padding }>{ calc.evasionRaw(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.joinBattlePool(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.rushPool(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.disengagePool(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.riseFromPronePool(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.takeCoverPool(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.withdrawPool(character) }</TableCell>

        </TableRow>
      </TableBody>
    </Table>

  </div>
}
CombatBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}

export default CombatBlock
