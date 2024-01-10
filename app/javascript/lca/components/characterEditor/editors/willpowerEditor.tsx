import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ResourceEditor from './resourceEditor'
import BlockPaper from 'components/generic/blockPaper.jsx'
import RatingField from 'components/generic/RatingField.jsx'
import commonStyles from 'styles'
import { WILLPOWER_MAX } from 'utils/constants.ts'
import type { Character } from 'utils/flow-types'
interface Props {
  character: Character
  onChange: $TSFixMeFunction
  classes: Record<string, $TSFixMe>
}

const WillpowerEditor = ({ character, onChange, classes }: Props) => (
  <BlockPaper>
    <Typography variant="h6">Willpower:</Typography>

    <Typography component="div" className={classes.flexContainer}>
      <RatingField
        trait="willpower_temporary"
        value={character.willpower_temporary}
        label="Current"
        margin="dense"
        narrow
        onChange={onChange}
      />
      <span className={classes.fieldSeparator}>/</span>
      <RatingField
        trait="willpower_permanent"
        value={character.willpower_permanent}
        label="Total"
        max={WILLPOWER_MAX}
        margin="dense"
        narrow
        onChange={onChange}
      />
    </Typography>

    {character.type !== 'Character' && (
      <ResourceEditor character={character} onChange={onChange} />
    )}
  </BlockPaper>
)

export default withStyles(commonStyles)(WillpowerEditor)
