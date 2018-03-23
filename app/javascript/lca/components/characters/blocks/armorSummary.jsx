import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import * as calc from '../../../utils/calculated'
import { withArmorStats } from '../../../utils/propTypes'

export default function ArmorSummary(props) {
  const { character, pools } = props
  const padding = 'dense'

  return <BlockPaper>
    <Typography variant="title">
      Armor &amp; Defense
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding={ padding } numeric>Evasion</TableCell>
          <TableCell padding={ padding }>Armor Name</TableCell>
          <TableCell padding={ padding } numeric>Soak</TableCell>
          <TableCell padding={ padding } numeric>Hardness</TableCell>
          <TableCell padding={ padding } numeric>
            <abbr title="Mobility Penalty">MP</abbr>
          </TableCell>
          <TableCell padding={ padding }>Tags</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell padding={ padding } numeric>{ pools.evasion.total }</TableCell>
          <TableCell padding={ padding }>{ character.armor_name }</TableCell>
          <TableCell padding={ padding } numeric>{ pools.soak.total }</TableCell>
          <TableCell padding={ padding } numeric>{ calc.hardness(character) }</TableCell>
          <TableCell padding={ padding } numeric>{ calc.mobilityPenalty(character) }</TableCell>
          <TableCell padding={ padding }>{ character.armor_tags.join(', ') }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </BlockPaper>
}
ArmorSummary.propTypes = {
  character: PropTypes.shape(withArmorStats),
  pools: PropTypes.object,
}
