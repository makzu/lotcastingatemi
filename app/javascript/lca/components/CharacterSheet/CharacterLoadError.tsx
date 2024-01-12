import * as React from 'react'
import { ConnectedProps, connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { RootState } from 'store'

const CharacterLoadError = ({ loading }: PropsFromRedux) => (
  <Typography paragraph>
    {loading
      ? 'This Character has not yet loaded.'
      : 'Could not load Character. It may not be publicly viewable.'}
  </Typography>
)

const mapState = (state: RootState) => ({ loading: state.app.loading })
const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CharacterLoadError)
