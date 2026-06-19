import Typography from '@material-ui/core/Typography'

import { useAppSelector } from '@lca/hooks/UseAppSelector'

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
