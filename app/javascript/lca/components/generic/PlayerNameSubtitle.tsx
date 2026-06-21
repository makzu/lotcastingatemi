import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

import { getSpecificPlayer } from '@lca/selectors/index.ts'
import type { RootState } from '@lca/store.ts'

type ExposedProps = {
  playerId: number
}
type Props = ExposedProps & {
  name: string
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

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  name: getSpecificPlayer(state, props.playerId).display_name,
})

const connector = connect(mapStateToProps)

export default connector(PlayerNameSubtitle)
