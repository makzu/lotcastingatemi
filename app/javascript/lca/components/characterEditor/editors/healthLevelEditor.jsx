// @flow

import Typography from '@mui/material/Typography'
import withStyles from '@mui/styles/withStyles'

import HealthLevelBoxes from 'components/generic/HealthLevelBoxes.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import BlockPaper from 'components/shared/BlockPaper'
import type { Character } from 'utils/flow-types'

const styles = (theme) => ({
  subheading: {
    marginTop: theme.spacing(),
  },
  separator: {
    ...theme.typography.body1,
    marginRight: theme.spacing(),
  },
  healthBoxesWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
})

type Props = {
  character: Character,
  penalties: Object,
  onChange: Function,
  classes: Object,
}
function HealthLevelEditor({ character, penalties, onChange, classes }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Health</Typography>

      <div className={classes.healthBoxesWrap}>
        <HealthLevelBoxes character={character} />
        <Typography>Current wound penalty: -{penalties.wound}</Typography>
      </div>

      <Typography variant="subtitle1" className={classes.subheading}>
        Damage:
      </Typography>
      <div>
        <RatingField
          trait="damage_bashing"
          value={character.damage_bashing}
          label="Bashing"
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="damage_lethal"
          value={character.damage_lethal}
          label="Lethal"
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="damage_aggravated"
          value={character.damage_aggravated}
          label="Aggravated"
          margin="dense"
          onChange={onChange}
        />
      </div>

      <Typography variant="subtitle1" className={classes.subheading}>
        Levels:
      </Typography>
      <div>
        <RatingField
          trait="health_level_0s"
          value={character.health_level_0s}
          label="0"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_1s"
          value={character.health_level_1s}
          label="-1"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_2s"
          value={character.health_level_2s}
          label="-2"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_4s"
          value={character.health_level_4s}
          label="-4"
          narrow
          margin="dense"
          onChange={onChange}
        />
        <RatingField
          trait="health_level_incap"
          value={character.health_level_incap}
          label="Incap"
          narrow
          margin="dense"
          onChange={onChange}
        />
      </div>
    </BlockPaper>
  )
}

export default withStyles(styles)(HealthLevelEditor)
