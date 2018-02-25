import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import ArmorPopup from '../editors/armorPopup.jsx'
import * as calc from '../../../utils/calculated'
import { withArmorStats } from '../../../utils/propTypes'

export default function ArmorSummary(props) {
  const { character } = props
  const naturalSoak = calc.naturalSoak(character)
  const armorSoak = calc.armorSoak(character)

  return <BlockPaper>
    <Typography variant="title">
      Armor &amp; Defense
      <ArmorPopup character={ character } />
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="dense" numeric>Evasion</TableCell>
          <TableCell padding="dense">Armor Name</TableCell>
          <TableCell padding="dense" numeric>Soak</TableCell>
          <TableCell padding="dense" numeric>Hardness</TableCell>
          <TableCell padding="dense" numeric>
            <abbr title="Mobility Penalty">MP</abbr>
          </TableCell>
          <TableCell padding="dense">Tags</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell padding="dense" numeric>{ calc.evasionRaw(character) }</TableCell>
          <TableCell padding="dense">{ character.armor_name }</TableCell>
          <TableCell padding="dense" numeric>{ naturalSoak + armorSoak }</TableCell>
          <TableCell padding="dense" numeric>{ calc.hardness(character) }</TableCell>
          <TableCell padding="dense" numeric>{ calc.mobilityPenalty(character) }</TableCell>
          <TableCell padding="dense">{ character.armor_tags.join(', ') }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </BlockPaper>
}
ArmorSummary.propTypes = {
  character: PropTypes.shape(withArmorStats)
}
