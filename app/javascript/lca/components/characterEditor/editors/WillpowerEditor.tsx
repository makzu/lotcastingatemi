import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import RatingField from '@lca/components/generic/RatingField.tsx'
import commonStyles from '@lca/styles'
import type { Character } from '@lca/types/index.ts'
import { WILLPOWER_MAX } from '@lca/utils/constants.ts'
import ResourceEditor from './ResourceEditor.tsx'

type Props = { character: Character; onChange: Function; classes: Object }
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
