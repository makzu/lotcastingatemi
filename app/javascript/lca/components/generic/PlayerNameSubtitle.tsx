import { connect } from 'react-redux'

import { getSpecificPlayer } from '@/selectors'

import type { RootState } from 'store'
import { Typography } from '@mui/material'

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
