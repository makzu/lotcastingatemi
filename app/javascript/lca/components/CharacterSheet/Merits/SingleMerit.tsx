import { Typography } from '@mui/material'
import { Theme } from '@mui/styles'

import { WithStyles } from '@mui/styles'
import createStyles from '@mui/styles/createStyles'
import withStyles from '@mui/styles/withStyles'

import RatingLine from 'components/generic/ratingLine.jsx'
import MarkdownDisplay from 'components/generic/MarkdownDisplay.jsx'
import BlockPaper from 'components/shared/BlockPaper'

import { Merit } from 'types'

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
