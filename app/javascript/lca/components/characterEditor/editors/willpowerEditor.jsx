// @flow
import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import ResourceEditor from './resourceEditor.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import { WILLPOWER_MAX } from 'utils/constants.js'
import type { Character } from 'utils/flow-types'

const styles = theme => ({
  separator: {
    ...theme.typography.body1,
    marginRight: theme.spacing.unit,
  },
})

type Props = { character: Character, onRatingChange: Function, classes: Object }
const WillpowerEditor = ({ character, onRatingChange, classes }: Props) => (
  <BlockPaper>
    <Typography variant="title">Willpower:</Typography>

    <div>
      <RatingField
        trait="willpower_temporary"
        value={character.willpower_temporary}
        label="Current"
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
      <span className={classes.separator}>/</span>
      <RatingField
        trait="willpower_permanent"
        value={character.willpower_permanent}
        label="Total"
        max={WILLPOWER_MAX}
        margin="dense"
        narrow
        onChange={onRatingChange}
      />
    </div>

    {character.type != 'Character' && (
      <ResourceEditor character={character} onChange={onRatingChange} />
    )}
  </BlockPaper>
)

export default withStyles(styles)(WillpowerEditor)
