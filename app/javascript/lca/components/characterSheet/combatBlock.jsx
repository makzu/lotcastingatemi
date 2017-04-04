import React from 'react'
import Divider from 'material-ui/Divider'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import * as calc from '../../utils/calculated'
import RatingDots from '../generic/ratingDots.jsx'


function CombatBlock(props) {
  const { character, weapons, merits } = props
  const naturalSoak = calc.naturalSoak(character)
  const armorSoak = calc.armorSoak(character)

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

export default CombatBlock
