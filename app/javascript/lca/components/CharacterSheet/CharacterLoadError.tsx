import { connect } from 'react-redux'

import Typography from '@mui/material/Typography'

import { State } from 'ducks'

interface Props {
  loading: boolean
}

const CharacterLoadError = ({ loading }: Props) => (
  <Typography paragraph>
    {loading
      ? 'This Character has not yet loaded.'
      : 'Could not load Character. It may not be publicly viewable.'}
  </Typography>
)

const mapState = ({ app }: State): Props => ({ loading: app.loading })

export default connect<Props>(mapState)(CharacterLoadError)
