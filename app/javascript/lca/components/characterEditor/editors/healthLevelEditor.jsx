// @flow
import React from 'react'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import HealthLevelBoxes from 'components/generic/HealthLevelBoxes.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  subheading: {
    marginTop: theme.spacing.unit,
  },
  separator: {
    ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
  healthBoxesWrap: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
})

function HealthLevelEditor({
  character,
  penalties,
  onRatingChange,
  classes,
}: {
  character: Character,
  penalties: Object,
  onRatingChange: Function,
  classes: Object,
}) {
  return (
    <BlockPaper>
      <Typography variant="title">Health</Typography>

      <div className={classes.healthBoxesWrap}>
        <HealthLevelBoxes character={character} />
        <Typography>Current wound penalty: -{penalties.wound}</Typography>
      </div>

      <Typography variant="subheading" className={classes.subheading}>
        Damage:
      </Typography>
      <div>
        <RatingField
          trait="damage_bashing"
          value={character.damage_bashing}
          label="Bashing"
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="damage_lethal"
          value={character.damage_lethal}
          label="Lethal"
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="damage_aggravated"
          value={character.damage_aggravated}
          label="Aggravated"
          margin="dense"
          onChange={onRatingChange}
        />
      </div>

      <Typography variant="subheading" className={classes.subheading}>
        Levels:
      </Typography>
      <div>
        <RatingField
          trait="health_level_0s"
          value={character.health_level_0s}
          label="0"
          narrow
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="health_level_1s"
          value={character.health_level_1s}
          label="-1"
          narrow
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="health_level_2s"
          value={character.health_level_2s}
          label="-2"
          narrow
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="health_level_4s"
          value={character.health_level_4s}
          label="-4"
          narrow
          margin="dense"
          onChange={onRatingChange}
        />
        <RatingField
          trait="health_level_incap"
          value={character.health_level_incap}
          label="Incap"
          narrow
          margin="dense"
          onChange={onRatingChange}
        />
      </div>
    </BlockPaper>
  )
}
export default withStyles(styles)(HealthLevelEditor)
