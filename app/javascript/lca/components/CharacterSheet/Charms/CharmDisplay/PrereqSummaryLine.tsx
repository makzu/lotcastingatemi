import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import type { Charm } from '@lca/types'

const useStyles = makeStyles({
  capitalize: {
    textTransform: 'capitalize',
  },
})

const showEvo = (charm: Charm) =>
  charm.charm_type === 'Evocation' && charm.artifact_name !== ''

type Props = { charm: Charm }
export const PrereqSummaryLine = ({ charm }: Props) => {
  const classes = useStyles()
  return (
    <Typography variant="caption">
      {showEvo(charm) && (
        <span className={classes.capitalize}>
          Evocation of {charm.artifact_name}
          ,&nbsp;
        </span>
      )}
      {charm.ability && (
        <span className={classes.capitalize}>
          {charm.ability} {charm.min_ability}
          ,&nbsp;
        </span>
      )}
      {charm.charm_type === 'MartialArts' && (
        <span className={classes.capitalize}>
          {charm.style} style {charm.min_ability}
          ,&nbsp;
        </span>
      )}
      Essence {charm.min_essence},&nbsp;
    </Typography>
  )
}

export default PrereqSummaryLine
