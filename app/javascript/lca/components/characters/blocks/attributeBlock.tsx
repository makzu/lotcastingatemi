import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import AttributeBlockPhysical from './attributeBlockPhysical'
import AttributeBlockSocial from './attributeBlockSocial'
import AttributeBlockMental from './attributeBlockMental'
import { Character } from 'types'
export interface Props {
  character: Character
  pools: Record<string, $TSFixMe>
}

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

      <Typography
        variant="caption"
        style={{
          marginTop: '0.5em',
        }}
      >
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
