//@flow
import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import type { Enhancer } from 'utils/flow-types'

type Props = {
  loading: boolean,
}

const CharacterLoadError = ({ loading }: Props) => (
  <Typography paragraph>
    {loading
      ? 'This Character has not yet loaded.'
      : 'Could not load Character. It may not be publicly viewable.'}
  </Typography>
)

const enhance: Enhancer<Props, {}> = connect(state => ({
  loading: state.app.loading,
}))

export default enhance(CharacterLoadError)
