import React from 'react'
import { compose, shouldUpdate } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import HealthLevelBoxes from 'components/generic/HealthLevelBoxes'
import RatingField from 'components/generic/RatingField'
import { isUnequalByKeys } from 'utils'
import type { Character } from 'utils/flow-types'

const styles = (theme) => ({
  subheading: {
    marginTop: theme.spacing(),
  },
  separator: { ...theme.typography.body1, marginRight: theme.spacing() },
  healthBoxesWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
})

interface Props {
  character: Character
  penalties: Record<string, $TSFixMe>
  onChange: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
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

export default compose(
  withStyles(styles),
  shouldUpdate((props, nextProps) =>
    isUnequalByKeys(props.character, nextProps.character, [
      'damage_bashing',
      'damage_lethal',
      'damage_aggravated',
      'health_level_0s',
      'health_level_1s',
      'health_level_2s',
      'health_level_4s',
      'health_level_incap',
    ]),
  ),
)(HealthLevelEditor)
