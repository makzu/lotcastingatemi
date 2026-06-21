// @flow
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import type { Character } from '@lca/utils/flow-types'
import AttributeBlockMental from './AttributeBlockMental.tsx'
import AttributeBlockPhysical from './AttributeBlockPhysical.tsx'
import AttributeBlockSocial from './AttributeBlockSocial.tsx'

export type Props = { character: Character; pools: Object }
function AttributeBlock({ character, pools }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Attributes</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AttributeBlockPhysical character={character} pools={pools} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AttributeBlockSocial character={character} pools={pools} />
        </Grid>
        <Grid item xs={12} md={4}>
          <AttributeBlockMental character={character} pools={pools} />
        </Grid>
      </Grid>

      <Typography variant="caption" style={{ marginTop: '0.5em' }}>
        {pools.exaltTypeBase === 'attribute' && (
          <span>
            *: Excellency,
            {character.aspect ? ' a: Aspect, ' : ' c: Caste, '}
            f: Favored
          </span>
        )}
        {pools.exaltTypeBase !== 'attribute' && false && (
          <span>p: Primary, s: Secondary</span>
        )}
      </Typography>
    </BlockPaper>
  )
}

export default AttributeBlock
