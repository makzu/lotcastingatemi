// @flow
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { getSpecificPlayer } from 'selectors'
import type { Enhancer } from 'utils/flow-types'

type ExposedProps = {
  playerId: number,
}
type Props = ExposedProps & {
  name: string,
}

function PlayerNameSubtitle({ name }: Props) {
  return (
    <Typography
      variant="caption"
      component="div"
      style={{ marginTop: '-0.25rem' }}
    >
      Player: {name}
    </Typography>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  name: getSpecificPlayer(state, props.playerId).display_name,
})

const enhance: Enhancer<Props, ExposedProps> = connect(mapStateToProps)

export default enhance(PlayerNameSubtitle)
