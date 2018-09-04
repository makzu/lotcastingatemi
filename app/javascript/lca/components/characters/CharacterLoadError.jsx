//@flow
import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

const CharacterLoadError = ({ loading }: { loading: boolean }) => (
  <Typography paragraph>
    {loading
      ? 'This Character has not yet loaded.'
      : 'Could not load Character. It may not be publicly viewable.'}
  </Typography>
)

export default connect(state => ({ loading: state.app.loading }))(
  CharacterLoadError
)
