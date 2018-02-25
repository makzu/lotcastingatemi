import React from 'react'
import PropTypes from 'prop-types'

import Table, { TableBody, TableHead, TableRow, TableCell } from 'material-ui/Table'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'

import * as calc from '../../../utils/calculated'
import { withAttributes, withAbilities } from '../../../utils/propTypes'

export default function SocialBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Social Pools
    </Typography>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric>Resolve</TableCell>
          <TableCell numeric>Guile</TableCell>
          <TableCell numeric>Read Int</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell numeric>{ calc.resolveRaw(character) }</TableCell>
          <TableCell numeric>{ calc.guileRaw(character) }</TableCell>
          <TableCell numeric>{ calc.readIntentionsPool(character) }</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </BlockPaper>
}
SocialBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities })
}
