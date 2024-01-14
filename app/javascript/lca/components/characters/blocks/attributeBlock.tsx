import AttributeBlockPhysical from './attributeBlockPhysical'
import AttributeBlockSocial from './attributeBlockSocial'
import AttributeBlockMental from './attributeBlockMental'
import BlockPaper from '@/components/shared/BlockPaper'
import type { Character } from '@/types'

import { Grid, Typography } from '@mui/material'

export interface Props {
  character: Character
  pools: Object
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
