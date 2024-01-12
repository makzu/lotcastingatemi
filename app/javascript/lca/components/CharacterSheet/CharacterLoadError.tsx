import Typography from '@mui/material/Typography'

import { useAppSelector } from 'hooks'

const CharacterLoadError = () => {
  const loading = useAppSelector((state) => state.app.loading)
  return (
    <Typography paragraph>
      {loading
        ? 'This Character has not yet loaded.'
        : 'Could not load Character. It may not be publicly viewable.'}
    </Typography>
  )
}

export default CharacterLoadError
