import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import * as calc from '../../utils/calculated'
import { withAttributes, withAbilities } from '../../utils/propTypes'

export function CombatBlock(props) {
  const { character } = props

  return(<div className="combatSummaryBlock">
    <h3>Combat Pools</h3>

    <Table className="poolTable" selectable={ false }>
      <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
        <TableRow>
          <TableHeaderColumn className="defenseValueName">Evasion</TableHeaderColumn>

          <TableHeaderColumn className="poolName">Join Battle</TableHeaderColumn>
          <TableHeaderColumn className="poolName">Rush</TableHeaderColumn>
          <TableHeaderColumn className="poolName">Disengage</TableHeaderColumn>
          <TableHeaderColumn className="poolName">Rise/Prone</TableHeaderColumn>
          <TableHeaderColumn className="poolName">Take Cover</TableHeaderColumn>
          <TableHeaderColumn className="poolName">Withdraw</TableHeaderColumn>

        </TableRow>
      </TableHeader>

      <TableBody displayRowCheckbox={ false }>
        <TableRow>
          <TableRowColumn className="defenseValue">{ calc.evasionRaw(character) }</TableRowColumn>

          <TableRowColumn className="pool">{ calc.joinBattlePool(character) }</TableRowColumn>
          <TableRowColumn className="pool">{ calc.rushPool(character) }</TableRowColumn>
          <TableRowColumn className="pool">{ calc.disengagePool(character) }</TableRowColumn>
          <TableRowColumn className="pool">{ calc.riseFromPronePool(character) }</TableRowColumn>
          <TableRowColumn className="pool">{ calc.takeCoverPool(character) }</TableRowColumn>
          <TableRowColumn className="pool">{ calc.withdrawPool(character) }</TableRowColumn>

        </TableRow>
      </TableBody>
    </Table>

  </div>)
}
CombatBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}

export default CombatBlock
