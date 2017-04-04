import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import * as calc from '../../utils/calculated'
import { withAttributes, withAbilities } from '../../utils/propTypes'

export default function SocialBlock(props) {
  const { character } = props

  return(<div className="socialSummaryBlock">
    <h3>Social Pools</h3>

    <Table className="poolTable" selectable={ false }>
      <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
        <TableRow>
          <TableHeaderColumn className="defenseValueName">Resolve</TableHeaderColumn>
          <TableHeaderColumn className="defenseValueName">Guile</TableHeaderColumn>

          <TableHeaderColumn className="poolName">Read Int</TableHeaderColumn>

        </TableRow>
      </TableHeader>

      <TableBody displayRowCheckbox={ false }>
        <TableRow>
          <TableRowColumn className="defenseValue">{ calc.resolveRaw(character) }</TableRowColumn>
          <TableRowColumn className="defenseValue">{ calc.guileRaw(character) }</TableRowColumn>

          <TableRowColumn className="pool">{ calc.readIntentionsPool(character) }</TableRowColumn>

        </TableRow>
      </TableBody>
    </Table>

  </div>)
}
SocialBlock.propTypes = {
  character: React.PropTypes.shape({ ...withAttributes, ...withAbilities })
}
