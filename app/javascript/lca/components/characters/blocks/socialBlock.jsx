import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities } from '../../../utils/propTypes'

export default function SocialBlock(props) {
  const { character } = props
  const padding = 'dense'

  return <BlockPaper>
    <Typography variant="title">
      Social Pools
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric padding={ padding }>Resolve</TableCell>
          <TableCell numeric padding={ padding }>Guile</TableCell>
          <TableCell numeric padding={ padding }>Read Int</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell numeric padding={ padding }>{ calc.resolveRaw(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.guileRaw(character) }</TableCell>
          <TableCell numeric padding={ padding }>{ calc.readIntentionsPool(character) }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </BlockPaper>
}
SocialBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}
