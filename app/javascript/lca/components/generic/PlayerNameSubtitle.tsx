import { connect } from 'react-redux'

import Typography from '@mui/material/Typography'

import { getSpecificPlayer } from 'selectors'
import { RootState } from 'store'

interface ExposedProps {
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
      style={{
        marginTop: '-0.25rem',
      }}
    >
      Player: {name}
    </Typography>
  )
}

const mapStateToProps = (state: RootState, props: ExposedProps) => ({
  name: getSpecificPlayer(state, props.playerId).display_name,
})

export default connect(mapStateToProps)(PlayerNameSubtitle)
