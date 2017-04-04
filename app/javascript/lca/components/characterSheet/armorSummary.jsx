import React from 'react'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import ArmorPopup from './editors/armorPopup.jsx'

import * as calc from '../../utils/calculated'
import { withArmorStats } from '../../utils/propTypes'

export default function ArmorSummary(props) {
  const { character } = props
  const naturalSoak = calc.naturalSoak(character)
  const armorSoak = calc.armorSoak(character)

  return(<div className="armorSummaryBlock">
    <h3>Armor &amp; Defense<ArmorPopup character={ character } /></h3>

    <Table className="armorTable" selectable={ false }>
      <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
        <TableRow>
          <TableHeaderColumn className="defenseValueName">Evasion</TableHeaderColumn>

          <TableHeaderColumn>Armor Name</TableHeaderColumn>
          <TableHeaderColumn className="soakColumn">Soak</TableHeaderColumn>
          <TableHeaderColumn className="hardnessColumn">Hardness</TableHeaderColumn>
          <TableHeaderColumn className="mobPenColumn">
            <abbr title="Mobility Penalty">MP</abbr>
          </TableHeaderColumn>
          <TableHeaderColumn>Tags</TableHeaderColumn>
        </TableRow>
      </TableHeader>

      <TableBody displayRowCheckbox={ false }>
        <TableRow>
          <TableRowColumn className="defenseValue">{ calc.evasionRaw(character) }</TableRowColumn>

          <TableRowColumn>{ character.armor_name }</TableRowColumn>
          <TableRowColumn className="soakColumn">{ naturalSoak + armorSoak }</TableRowColumn>
          <TableRowColumn className="hardnessColumn">{ calc.hardness(character) }</TableRowColumn>
          <TableRowColumn className="mobPenColumn">{ calc.mobilityPenalty(character) }</TableRowColumn>
          <TableRowColumn>{ character.armor_tags.join(', ') }</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </div>)
}
ArmorSummary.propTypes = {
  character: React.PropTypes.shape(withArmorStats)
}
