import { Typography } from '@material-ui/core'
import {
  createStyles,
  type Theme,
  type WithStyles,
  withStyles,
} from '@material-ui/core/styles'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import RatingLine from '@lca/components/generic/RatingLine.tsx'
import type { Merit } from '@lca/types/traits/merit.ts'

const styles = (theme: Theme) =>
  createStyles({
    categoryLine: {
      textTransform: 'capitalize',
    },
    meritName: {
      ...theme.typography.caption,
      marginLeft: theme.spacing(),
      textTransform: 'capitalize',
    },
    name: {
      textTransform: 'capitalize',
    },
  })

interface Props extends WithStyles<typeof styles> {
  merit: Merit
}
const SingleMerit = ({ merit, classes }: Props) => (
  <BlockPaper>
    <Typography variant="h6">
      <RatingLine rating={merit.rating} dontFill merit>
        <span className={classes.name}>{merit.label || merit.merit_name}</span>
        {merit.label && (
          <span className={classes.meritName}>({merit.merit_name})</span>
        )}
      </RatingLine>
    </Typography>

    <Typography className={classes.categoryLine} variant="caption" gutterBottom>
      {merit.supernatural && 'Supernatural '}
      {merit.merit_cat} {merit.merit_cat !== 'flaw' && 'Merit'}
    </Typography>

    <MarkdownDisplay source={merit.description} />

    <Typography variant="caption">Ref: {merit.ref}</Typography>
  </BlockPaper>
)
export default withStyles(styles)(SingleMerit)
