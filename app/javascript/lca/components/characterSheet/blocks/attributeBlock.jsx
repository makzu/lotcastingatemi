import React from 'react'
import PropTypes from 'prop-types'

import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

import BlockPaper from '../../generic/blockPaper.jsx'
import AttributeBlockPhysical from './attributeBlockPhysical.jsx'
import AttributeBlockSocial from './attributeBlockSocial.jsx'
import AttributeBlockMental from './attributeBlockMental.jsx'
import AttributePopup from '../editors/attributePopup.jsx'
import { withAttributes } from '../../../utils/propTypes'

function AttributeBlock(props) {
  const { character } = props

  return <BlockPaper>
    <Typography variant="title">
      Attributes
      <AttributePopup character={ character } />
    </Typography>
    <Grid container spacing={ 24 }>
      <Grid item xs={ 4 }>
        <AttributeBlockPhysical character={ character } />
      </Grid>
      <Grid item xs={ 4 }>
        <AttributeBlockSocial character={ character } />
      </Grid>
      <Grid item xs={ 4 }>
        <AttributeBlockMental character={ character } />
      </Grid>
    </Grid>
  </BlockPaper>
}
AttributeBlock.propTypes = {
  character: PropTypes.shape(withAttributes),
}

export default AttributeBlock
