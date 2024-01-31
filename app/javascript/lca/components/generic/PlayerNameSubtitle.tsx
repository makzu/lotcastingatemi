import { Typography } from '@mui/material'

import { getSpecificPlayer } from '@/selectors'
import { useAppSelector } from '@/hooks'

function PlayerNameSubtitle({ playerId }: { playerId: number }) {
  const name = useAppSelector(
    (state) => getSpecificPlayer(state, playerId)?.display_name,
  )
  return (
    <Typography
      variant="caption"
      component="div"
      sx={{ marginTop: '-0.25rem' }}
    >
      Player: {name}
    </Typography>
  )
}

export default PlayerNameSubtitle
