import React from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import AttributeBlockPhysical from './attributeBlockPhysical.jsx'
import AttributeBlockSocial from './attributeBlockSocial.jsx'
import AttributeBlockMental from './attributeBlockMental.jsx'
import { withAttributes } from '../../../utils/propTypes'

function AttributeBlock(props) {
  const { character, pools } = props

  return <BlockPaper>
    <Typography variant="title">
      Attributes
    </Typography>
    <Grid container spacing={ 24 }>
      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlockPhysical character={ character } pools={ pools } />
      </Grid>
      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlockSocial character={ character } pools={ pools } />
      </Grid>
      <Grid item xs={ 12 } md={ 4 }>
        <AttributeBlockMental character={ character } pools={ pools } />
      </Grid>
    </Grid>

    <Typography variant="caption" style={{ marginTop: '0.5em' }}>
      { pools.exaltTypeBase === 'attribute' &&
        <span>
          *: Excellency,
          { character.aspect ? ' a: Aspect, ' : ' c: Caste, ' }
          f: Favored
        </span>
      }
      { pools.exaltTypeBase !== 'attribute' && false &&
        <span>p: Primary, s: Secondary</span>
      }
    </Typography>

  </BlockPaper>
}
AttributeBlock.propTypes = {
  character: PropTypes.shape(withAttributes).isRequired,
  pools: PropTypes.object.isRequired,
}

export default AttributeBlock
